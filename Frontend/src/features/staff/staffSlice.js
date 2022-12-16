import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../apiClient/apiClient";

const initialState = {
  status: null,
  meta: {},
  profile: null,
  staffs: [],
  positions: [],
  departments: [],
  jobTitles: [],
};

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdGFmZl9pZCI6MTYsImV4cCI6MTY3MTY4NjU1OH0.8exnddQEzMACU4XtXKcOV_XUNVWBCZHRj46KP6UUG3c";

export const fetchStaffAsync = createAsyncThunk(
  "staff/fetchStaffAsync",
  async () => {
    const response = axios.get(
      "http://localhost:3000/api/v1/staff_management/staffs",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
);

export const fetchPositionAsync = createAsyncThunk(
  "staff/fetchPositionAsync",
  async () => {
    const response = axios.get(
      "http://localhost:3000/api/v1/staff_management/positions",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
);

export const fetchDepartmentAsync = createAsyncThunk(
  "staff/fetchDepartmentAsync",
  async () => {
    const response = axios.get(
      "http://localhost:3000/api/v1/staff_management/departments",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
);

export const fetchJobTitleAsync = createAsyncThunk(
  "staff/fetchJobTitleAsync",
  async () => {
    const response = axios.get(
      "http://localhost:3000/api/v1/staff_management/job_titles",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
);

export const fetchProfileAsync = createAsyncThunk(
  "staff/fetchProfileAsync",
  async (id) => {
    const response = apiClient.get(`api/v1/staff_management/staffs/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response;
  }
);

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== Staff =================
    builder
      .addCase(fetchStaffAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffAsync.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.meta = action.payload.data.meta;
        state.staffs = action.payload.data.data;
      })
      .addCase(fetchStaffAsync.rejected, (state) => {
        state.status = "errors";
      });
    // ================== Position =================
    builder
      .addCase(fetchPositionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPositionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = action.payload.data.data;
      })
      .addCase(fetchPositionAsync.rejected, (state) => {
        state.status = "error";
      });
    // ================== Department =================
    builder
      .addCase(fetchDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDepartmentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departments = action.payload.data.data;
      })
      .addCase(fetchDepartmentAsync.rejected, (state) => {
        state.status = "error";
      });
    // ================== Job Title =================
    builder
      .addCase(fetchJobTitleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobTitleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobTitles = action.payload.data.data;
      })
      .addCase(fetchJobTitleAsync.rejected, (state) => {
        state.status = "error";
      });
    // ================== Profile =================
    builder
      .addCase(fetchProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.data.data.attributes;
      })
      .addCase(fetchProfileAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const staffSelector = (state) => state.staff.staffs;
export const positionSelector = (state) => state.staff.positions;
export const departmentSelector = (state) => state.staff.departments;
export const jobTitleSelector = (state) => state.staff.jobTitles;
export const ProfileSelector = (state) => state.staff.profile;

export const metaSelector = (state) => state.staff.meta;

export default staffSlice.reducer;
