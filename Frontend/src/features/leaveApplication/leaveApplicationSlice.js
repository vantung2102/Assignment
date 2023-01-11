import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy } from "../../common/hooks/hooks";

const initialState = {
  status: null,
  meta: null,
  leaveApplications: null,
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

export const leaveApplicationByUser = createAsyncThunk(
  "leaveApplicationByUser",
  async (id) => {
    const response = await apiClient.post(
      `/api/v1/leave_management/leave_applications/leave_application_by_user`,
      { staff_id: id },
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

export const leaveApplicationByStatus = createAsyncThunk(
  "leaveApplicationByStatus",
  async (status) => {
    const response = await apiClient.post(
      `/api/v1/leave_management/leave_applications/leave_application_by_status`,
      { status: status },
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
      .addCase(fetchLeaveApplication.pending, (state) => {})
      .addCase(fetchLeaveApplication.fulfilled, (state, action) => {
        state.leaveApplications = action.payload.data;
      })
      .addCase(fetchLeaveApplication.rejected, (state) => {});

    // ================== newLeaveApplication =================
    builder
      .addCase(newLeaveApplication.pending, (state) => {})
      .addCase(newLeaveApplication.fulfilled, (state, action) => {
        state.leaveApplications.unshift(action.payload.data);
        toast.success("Create Success");
      })
      .addCase(newLeaveApplication.rejected, (state, action) => {
        toast.error("Create  Failed");
      });
    // ================== show LeaveApplication =================
    builder
      .addCase(showLeaveApplication.pending, (state) => {})
      .addCase(showLeaveApplication.fulfilled, (state, action) => {
        state.leaveApplication = action.payload.data;
      })
      .addCase(showLeaveApplication.rejected, (state) => {});
    // ================== res LeaveApplication =================
    builder
      .addCase(responseLeaveApplication.pending, (state) => {})
      .addCase(responseLeaveApplication.fulfilled, (state, action) => {
        state.leaveApplication = action.payload.data;
      })
      .addCase(responseLeaveApplication.rejected, (state) => {});
    // ================== res LeaveApplication =================
    builder
      .addCase(leaveApplicationByUser.pending, (state) => {})
      .addCase(leaveApplicationByUser.fulfilled, (state, action) => {
        state.leaveApplications = action.payload.data;
      })
      .addCase(leaveApplicationByUser.rejected, (state) => {});
    // ================== status LeaveApplication =================
    builder
      .addCase(leaveApplicationByStatus.pending, (state) => {})
      .addCase(leaveApplicationByStatus.fulfilled, (state, action) => {
        state.leaveApplications = action.payload.data;
      })
      .addCase(leaveApplicationByStatus.rejected, (state) => {});

    // ================== destroy LeaveApplication =================
    builder
      .addCase(destroyLeaveApplication.pending, (state) => {})
      .addCase(destroyLeaveApplication.fulfilled, (state, action) => {
        state.leaveApplications = useDestroy(state.leaveApplications, action);
        toast.success("Destroy success");
      })
      .addCase(destroyLeaveApplication.rejected, (state) => {
        toast.success("Destroy Failed");
      });
  },
});

export const leaveApplicationsSelector = (state) =>
  state.leaveApplication.leaveApplications;
export const leaveApplicationSelector = (state) =>
  state.leaveApplication.leaveApplication;

export default leaveApplicationSlice.reducer;
