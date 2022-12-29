import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiClient from "../../apiClient/apiClient";

const initialState = {
  status: null,
  meta: {},
  profile: null,
  staffs: [],
  staffChart: null,
  staffChartByNode: [],
};

export const fetchStaff = createAsyncThunk("fetchStaff", async () => {
  const response = await apiClient.get("/api/v1/staff_management/staffs", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });
  return response.data;
});

export const fetchProfile = createAsyncThunk("fetchProfile", async (id) => {
  const response = await apiClient.get(`api/v1/staff_management/staffs/${id}`, {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return response.data;
});

export const newStaff = createAsyncThunk("newStaff", async (data) => {
  const response = apiClient.post(
    "api/v1/staff_management/staffs/",
    { staff: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const fetchStaffChart = createAsyncThunk("fetchStaffChart", async () => {
  const response = await apiClient.get(
    "/api/v1/staff_management/staffs/chart",
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== Staff =================
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.meta = action.payload.data.meta;
        state.staffs = action.payload.data;
      })
      .addCase(fetchStaff.rejected, (state) => {
        state.status = "errors";
      });
    // ================== Profile =================
    builder
      .addCase(newStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffs.push(action.meta.arg);
        toast.success("Create employee Success");
      })
      .addCase(newStaff.rejected, (state) => {
        state.status = "error";
        toast.error("Create employee failed");
      });
    // ================== Profile =================
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "error";
      });
    // ================== Chart =================
    builder
      .addCase(fetchStaffChart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffChart = action.payload.data;
      })
      .addCase(fetchStaffChart.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const staffsSelector = (state) => state.staff.staffs;
export const ProfileSelector = (state) => state.staff.profile;
export const staffChartSelector = (state) => state.staff.staffChart;
export const staffChartByNodeSelector = (state) => state.staff.staffChartByNode;

export const metaSelector = (state) => state.staff.meta;

export default staffSlice.reducer;
