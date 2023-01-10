import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  status: null,
  meta: null,
  leaves: [],
  leave: null,
  leaveCurrentUser: null,
};

export const fetchLeave = createAsyncThunk("fetchLeave", async () => {
  const response = await apiClient.get("/api/v1/leave_management/leaves", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });
  return response.data;
});

export const newLeave = createAsyncThunk("newLeave", async (data) => {
  const response = await apiClient.post(
    "api/v1/leave_management/leaves",
    { leave: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const showLeave = createAsyncThunk("showLeave", async (id) => {
  const response = await apiClient.get(`api/v1/leave_management/leaves/${id}`, {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return response.data;
});

export const editLeave = createAsyncThunk("editLeave", async (data) => {
  const response = await apiClient.get(
    `/api/v1/leave_management/leaves/${data.id}`,
    {
      Leave: {
        name: data.name,
        description: data.description,
        department_id: data.department,
      },
    },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const destroyLeave = createAsyncThunk("destroyLeave", async (id) => {
  await apiClient.delete(`/api/v1/leave_management/leaves/${id}`, {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return id;
});

export const leaveByUser = createAsyncThunk("leaveByUser", async (id) => {
  const response = await apiClient.post(
    `api/v1/leave_management/leaves/leave_by_user`,
    { staff_id: id },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const leaveSlice = createSlice({
  name: "leaveSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== get all leave =================
    builder
      .addCase(fetchLeave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaves = action.payload.data;
      })
      .addCase(fetchLeave.rejected, (state) => {
        state.status = "error";
      });

    // ================== new leave =================
    builder
      .addCase(newLeave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaves.unshift(action.payload.data);
        toast.success("Create Success");
      })
      .addCase(newLeave.rejected, (state) => {
        state.status = "error";
        toast.success("Create  Failed");
      });
    // ================== show leave =================
    builder
      .addCase(showLeave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leave = action.payload.data;
      })
      .addCase(showLeave.rejected, (state) => {
        state.status = "error";
      });
    // ================== leave by user leave =================
    builder
      .addCase(leaveByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(leaveByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveCurrentUser = action.payload.data;
      })
      .addCase(leaveByUser.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const leavesSelector = (state) => state.leave.leaves;
export const leaveSelector = (state) => state.leave.leave;
export const leaveCurrentUserSelector = (state) => state.leave.leaveCurrentUser;

export default leaveSlice.reducer;
