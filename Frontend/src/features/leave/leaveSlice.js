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

export const fetchLeave = createAsyncThunk("fetchLeave", async (number) => {
  const response = await apiClient.get(
    `/api/v1/leave_management/leaves?page[number]=${number ? number : 1}`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
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
      .addCase(fetchLeave.pending, (state) => {})
      .addCase(fetchLeave.fulfilled, (state, action) => {
        state.leaves = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchLeave.rejected, (state) => {});

    // ================== new leave =================
    builder
      .addCase(newLeave.pending, (state) => {})
      .addCase(newLeave.fulfilled, (state, action) => {
        state.leaves.unshift(action.payload.data);
        toast.success("Create Success");
      })
      .addCase(newLeave.rejected, (state) => {
        toast.success("Create  Failed");
      });
    // ================== show leave =================
    builder
      .addCase(showLeave.pending, (state) => {})
      .addCase(showLeave.fulfilled, (state, action) => {
        state.leave = action.payload.data;
      })
      .addCase(showLeave.rejected, (state) => {});
    // ================== leave by user leave =================
    builder
      .addCase(leaveByUser.pending, (state) => {})
      .addCase(leaveByUser.fulfilled, (state, action) => {
        state.leave = action.payload.data;
        state.leaveCurrentUser = action.payload.data;
      })
      .addCase(leaveByUser.rejected, (state) => {});
  },
});

export const leavesSelector = (state) => state.leave.leaves;
export const leaveSelector = (state) => state.leave.leave;
export const leaveCurrentUserSelector = (state) => state.leave.leaveCurrentUser;
export const metaLeaveSelector = (state) => state.leave.meta;

export default leaveSlice.reducer;
