import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy, useEdit } from "../../common/hooks/hooks";

const initialState = {
  status: null,
  loading: true,
  meta: {},
  staffOnboarding: null,
  onboardingStep: null,
  onboardingSample: null,
};

export const staffOnboarding = createAsyncThunk(
  "staffOnboarding",
  async (id) => {
    const response = await apiClient.post(
      "/api/v1/onboarding_management/staff_onboardings/staff_onboarding_by_user",
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

export const onboardingSample = createAsyncThunk(
  "onboardingSample",
  async () => {
    const response = await apiClient.get(
      "/api/v1/onboarding_management/onboarding_sample_steps",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const fetchOnboardingStep = createAsyncThunk(
  "fetchOnboardingStep",
  async (id) => {
    const response = await apiClient.get(
      "/api/v1/onboarding_management/staff_onboardings/onboarding_steps/onboarding_steps_by_staff_onboarding",
      { staff_onboarding_id: id },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const newOnboardingSampleStep = createAsyncThunk(
  "newOnboardingSampleStep",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/onboarding_management/onboarding_sample_steps",
      { onboarding_sample_step: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const editDepartment = createAsyncThunk(
  "editDepartment",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/staff_management/departments/${data.id}`,
      { department: { name: data.name, description: data.description } },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const destroyDepartment = createAsyncThunk(
  "destroyDepartment",
  async (id) => {
    const response = await apiClient.delete(
      `/api/v1/staff_management/departments/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return id;
  }
);

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All Department =================
    builder
      .addCase(staffOnboarding.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(staffOnboarding.fulfilled, (state, action) => {
        state.loading = false;
        state.staffOnboarding = action.payload.data;
      })
      .addCase(staffOnboarding.rejected, (state) => {
        state.status = "error";
      });
    // ================== show Department =================
    builder
      .addCase(onboardingSample.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(onboardingSample.fulfilled, (state, action) => {
        state.onboardingSample = action.payload.data;
      })
      .addCase(onboardingSample.rejected, (state) => {
        state.status = "error";
      });
    // ================== New Department =================
    builder
      .addCase(newOnboardingSampleStep.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newOnboardingSampleStep.fulfilled, (state, action) => {
        state.onboardingSample.unshift(action.payload.data);
        toast.success("Create Department Successfully!");
      })
      .addCase(newOnboardingSampleStep.rejected, (state) => {
        state.status = "error";
        toast.error("Create Department failed!");
      });
    // ================== edit Department =================
    builder
      .addCase(fetchOnboardingStep.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOnboardingStep.fulfilled, (state, action) => {
        state.onboardingStep = action.payload.data;
      })
      .addCase(fetchOnboardingStep.rejected, (state) => {
        state.status = "error";
      });
    // ================== Destroy Department =================
    builder
      .addCase(destroyDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(destroyDepartment.fulfilled, (state, action) => {
        state.departments = useDestroy(state.departments, action);
        toast.success("Destroy Successfully !");
      })
      .addCase(destroyDepartment.rejected, (state) => {
        state.status = "error";
        toast.error("Destroy Successfully !");
      });
  },
});

export const staffOnboardingSelector = (state) =>
  state.onboarding.staffOnboarding;
export const onboardingSampleSelector = (state) =>
  state.onboarding.onboardingSample;
export const onboardingStepSelector = (state) =>
  state.onboarding.onboardingStep;

export default onboardingSlice.reducer;
