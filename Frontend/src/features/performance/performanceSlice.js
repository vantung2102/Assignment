import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  status: null,
  meta: {},
  performances: null,
};

export const fetchPerformance = createAsyncThunk(
  "fetchPerformance",
  async () => {
    const response = await apiClient.get(
      "api/v1/performance_management/performance_appraisal_forms",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const CreateAllPerformance = createAsyncThunk(
  "CreateAllPerformance",
  async (data) => {
    const response = await apiClient.post(
      "/api/v1/performance_management/performance_appraisal_forms/create_all_fa_forms_for_staff",
      { pa_form: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const updateAllActiveOrInactive = createAsyncThunk(
  "updateAllActiveOrInactive",
  async (data) => {
    const response = await apiClient.post(
      "/api/v1/performance_management/performance_appraisal_forms/update_all_active_or_inactive",
      { data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== get all position =================
    builder
      .addCase(fetchPerformance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerformance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.performances = action.payload.data;
      })
      .addCase(fetchPerformance.rejected, (state) => {
        state.status = "error";
      });
    // ================== get all position =================
    builder
      .addCase(CreateAllPerformance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateAllPerformance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.performances = action.payload.data;
      })
      .addCase(CreateAllPerformance.rejected, (state) => {
        state.status = "error";
      });

    // ================== inactive =================
    builder
      .addCase(updateAllActiveOrInactive.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAllActiveOrInactive.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("#####################");
        state.performances = action.payload.data;
      })
      .addCase(updateAllActiveOrInactive.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const performancesSelector = (state) => state.performance.performances;

export default performanceSlice.reducer;
