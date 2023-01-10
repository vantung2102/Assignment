import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  status: null,
  meta: null,
  leaveApplications: [],
  leaveApplication: null,
};

export const fetchLeaveApplication = createAsyncThunk(
  "fetchLeaveApplication",
  async () => {
    const response = await apiClient.get(
      "/api/v1/leave_management/leave_applications",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const newLeaveApplication = createAsyncThunk(
  "newLeaveApplication",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/leave_management/leave_applications",
      { leave_application: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const showLeaveApplication = createAsyncThunk(
  "showLeaveApplication",
  async (id) => {
    const response = await apiClient.get(
      `api/v1/leave_management/leave_applications/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const editLeaveApplication = createAsyncThunk(
  "editLeaveApplication",
  async (data) => {
    const response = await apiClient.get(
      `/api/v1/leave_management/leave_applications/${data.id}`,
      {
        leave_application: {
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
  }
);

export const destroyLeaveApplication = createAsyncThunk(
  "destroyLeaveApplication",
  async (id) => {
    await apiClient.delete(
      `/api/v1/leave_management/leave_applications/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return id;
  }
);

export const responseLeaveApplication = createAsyncThunk(
  "responseLeaveApplication",
  async (data) => {
    const response = await apiClient.post(
      `/api/v1/leave_management/leave_applications/${data.id}/respond_to_leave_application`,
      {
        leave_application: { status: data.status },
      },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const leaveApplicationSlice = createSlice({
  name: "leaveApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== get all LeaveApplication =================
    builder
      .addCase(fetchLeaveApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaveApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveApplications = action.payload.data;
      })
      .addCase(fetchLeaveApplication.rejected, (state) => {
        state.status = "error";
      });

    // ================== get all LeaveApplication =================
    builder
      .addCase(newLeaveApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newLeaveApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveApplications.unshift(action.payload.data);
        toast.success("Create Success");
      })
      .addCase(newLeaveApplication.rejected, (state, action) => {
        state.status = "error";
        toast.error("Create  Failed");
      }); // ================== get all LeaveApplication =================
    builder
      .addCase(showLeaveApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showLeaveApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveApplication = action.payload.data;
      })
      .addCase(showLeaveApplication.rejected, (state) => {
        state.status = "error";
      });
    builder
      .addCase(responseLeaveApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(responseLeaveApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveApplication = action.payload.data;
      })
      .addCase(responseLeaveApplication.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const leaveApplicationsSelector = (state) =>
  state.leaveApplication.leaveApplications;
export const leaveApplicationSelector = (state) =>
  state.leaveApplication.leaveApplication;

export default leaveApplicationSlice.reducer;
