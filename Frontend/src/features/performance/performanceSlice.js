import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  status: null,
  meta: null,
  performances: null,
  reviewForStaffs: null,
  reviewForStaff: null,
  selfReviews: null,
  selfReview: null,
  performance: null,
  isOpenPerformance: false,
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

export const fetchReviewForStaff = createAsyncThunk(
  "reviewForStaff",
  async () => {
    const response = await apiClient.get(
      "/api/v1/performance_management/performance_appraisal_forms/pa_forms_by_my_reviewed",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const fetchPerformanceByUser = createAsyncThunk(
  "fetchPerformanceByUser",
  async () => {
    const response = await apiClient.get(
      "/api/v1/performance_management/performance_appraisal_forms/pa_forms_by_current_user",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const showSelfReview = createAsyncThunk("showSelfReview", async () => {
  const response = await apiClient.get(
    `/api/v1/performance_management/performance_appraisal_forms/show_self_review`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const showPerformance = createAsyncThunk(
  "showPerformance",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/performance_management/performance_appraisal_forms/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const editSelfReview = createAsyncThunk(
  "editSelfReview",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/performance_management/performance_appraisal_forms/${data.id}`,
      {
        params: {
          id: data.id,
        },
        pa_form: {
          status: data.status,
          goals_set_staff: data.question1,
          achievement_staff: data.question2,
          goals_with_company_staff: data.question3,
          challenging_staff: data.question4,
          least_enjoy_staff: data.question5,
          contribute_staff: data.question6,
          current_job_staff: data.question7,
          improvement_staff: data.question8,
          obstructing_staff: data.question9,
          feedback_staff: data.question10,
          description_staff: data.question11,
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

export const editReviewForStaff = createAsyncThunk(
  "editReviewForStaff",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/performance_management/performance_appraisal_forms/${data.id}`,
      {
        params: {
          id: data.id,
        },
        pa_form: {
          status: data.status,
          goals_set_boss: data.question1,
          achievement_boss: data.question2,
          goals_with_company_boss: data.question3,
          challenging_boss: data.question4,
          least_enjoy_boss: data.question5,
          contribute_boss: data.question6,
          current_job_boss: data.question7,
          improvement_boss: data.question8,
          obstructing_boss: data.question9,
          feedback_boss: data.question10,
          description_boss: data.question11,
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

export const remindPerformance = createAsyncThunk(
  "remindPerformance",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/performance_management/performance_appraisal_forms/${id}/remind_by_staff`,
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
        if (action.payload.data.length > 0) state.isOpenPerformance = false;
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
        // state.performances = action.payload.data;
        state.isOpenPerformance = true;
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
        state.performances = action.payload.data;
      })
      .addCase(updateAllActiveOrInactive.rejected, (state) => {
        state.status = "error";
      });
    // ================== show self review =================
    builder
      .addCase(showSelfReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showSelfReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selfReview = action.payload.data;
      })
      .addCase(showSelfReview.rejected, (state) => {
        state.status = "error";
      });
    // ================== review for staff =================
    builder
      .addCase(fetchReviewForStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewForStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviewForStaffs = action.payload.data;
      })
      .addCase(fetchReviewForStaff.rejected, (state) => {
        state.status = "error";
      });
    // ================== review =================
    builder
      .addCase(editReviewForStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editReviewForStaff.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          // toast.error(action.payload.message);
          toast.error("Failed");
        } else {
          state.performance = action.payload.data;

          toast.success("Save Successfully");
        }
      })
      .addCase(editReviewForStaff.rejected, (state) => {
        toast.error("Failed");
      });
    // ================== edit self review =================
    builder
      .addCase(editSelfReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSelfReview.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          toast.error("Failed");
        } else {
          state.performance = action.payload.data;
          toast.success("Save Successfully");
        }
      })
      .addCase(editSelfReview.rejected, (state) => {
        toast.error("Failed");
      });
    // ================== show performance =================
    builder
      .addCase(showPerformance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showPerformance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.performance = action.payload.data;
      })
      .addCase(showPerformance.rejected, (state) => {
        state.status = "error";
      });
    // ================== remind user =================
    builder
      .addCase(remindPerformance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(remindPerformance.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Send mail successfully");
      })
      .addCase(remindPerformance.rejected, (state) => {
        state.status = "error";
        toast.error("Send mail failed");
      });
    // ================== remind user =================
    builder
      .addCase(fetchPerformanceByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerformanceByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selfReviews = action.payload.data;
      })
      .addCase(fetchPerformanceByUser.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const performancesSelector = (state) => state.performance.performances;
export const performanceSelector = (state) => state.performance.performance;
export const selfReviewPerformanceSelector = (state) =>
  state.performance.selfReview;
export const selfReviewsPerformanceSelector = (state) =>
  state.performance.selfReviews;
export const reviewForStaffSelector = (state) =>
  state.performance.reviewForStaff;
export const reviewForStaffsSelector = (state) =>
  state.performance.reviewForStaffs;
export const isOpenPerformanceSelector = (state) =>
  state.performance.isOpenPerformance;

export default performanceSlice.reducer;
