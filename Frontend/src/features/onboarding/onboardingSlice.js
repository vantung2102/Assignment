import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy, useEdit } from "../../common/hooks/hooks";

const initialState = {
  loading: true,
  onboardingSteps: null,
  onboardingStep: null,
  staffOnboarding: null,
  onboardingSample: null,
  onboardingSampleStep: null,
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
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/onboarding_management/onboarding_sample_steps`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
        params: { position: id },
      }
    );
    return response.data;
  }
);

export const showOnboardingSample = createAsyncThunk(
  "showOnboardingSample",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/onboarding_management/onboarding_sample_steps/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const editOnboardingSample = createAsyncThunk(
  "editOnboardingSample",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/onboarding_management/onboarding_sample_steps/${data.id}`,
      {
        onboarding_sample_step: {
          position_id: data.position_id,
          task: data.task,
          description: data.description,
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

export const showOnboardingStep = createAsyncThunk(
  "showOnboardingStep",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/onboarding_management/onboarding_steps/${id}`,
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
    const response = await apiClient.post(
      "/api/v1/onboarding_management/onboarding_steps/onboarding_steps_by_staff_onboarding",
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

export const editOnboardingStep = createAsyncThunk(
  "editOnboardingStep",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/onboarding_management/onboarding_steps/${data.id}`,
      {
        onboarding_step: {
          assigned_person_id: data.staff_id,
          start_date: data.start_date,
          due_date: data.due_date,
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

export const destroyOnboardingStep = createAsyncThunk(
  "destroyOnboardingStep",
  async (id) => {
    await apiClient.delete(
      `/api/v1/onboarding_management/onboarding_steps/${id}`,

      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return id;
  }
);

export const completeOnboardingStep = createAsyncThunk(
  "completeOnboardingStep",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/onboarding_management/onboarding_steps/${id}/complete_onboarding_step`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const destroyOnboarding = createAsyncThunk(
  "destroyOnboarding",
  async (id) => {
    await apiClient.delete(
      `/api/v1/onboarding_management/onboarding_sample_steps/${id}`,
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
    // ================== All  =================
    builder
      .addCase(staffOnboarding.pending, (state) => {
        state.loading = true;
      })
      .addCase(staffOnboarding.fulfilled, (state, action) => {
        state.loading = false;
        state.staffOnboarding = action.payload.data;
      })
      .addCase(staffOnboarding.rejected, (state) => {});
    // ================== all  =================
    builder
      .addCase(onboardingSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(onboardingSample.fulfilled, (state, action) => {
        state.onboardingSample = action.payload.data;
      })
      .addCase(onboardingSample.rejected, (state) => {});
    // ================== show  =================
    builder
      .addCase(showOnboardingSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(showOnboardingSample.fulfilled, (state, action) => {
        state.onboardingSampleStep = action.payload.data;
      })
      .addCase(showOnboardingSample.rejected, (state) => {});
    // ================== edit  =================
    builder
      .addCase(editOnboardingSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(editOnboardingSample.fulfilled, (state, action) => {
        state.onboardingSample = useEdit(state.onboardingSample, action);
      })
      .addCase(editOnboardingSample.rejected, (state) => {});
    // ================== New  =================
    builder
      .addCase(newOnboardingSampleStep.pending, (state) => {})
      .addCase(newOnboardingSampleStep.fulfilled, (state, action) => {
        state.onboardingSample.unshift(action.payload.data);
        toast.success("Create Successfully!");
      })
      .addCase(newOnboardingSampleStep.rejected, (state) => {
        toast.error("Create failed!");
      });
    // ================== edit  =================
    builder
      .addCase(fetchOnboardingStep.pending, (state) => {})
      .addCase(fetchOnboardingStep.fulfilled, (state, action) => {
        state.onboardingSteps = action.payload.data;
      })
      .addCase(fetchOnboardingStep.rejected, (state) => {});

    // ================== show  =================
    builder
      .addCase(showOnboardingStep.pending, (state) => {})
      .addCase(showOnboardingStep.fulfilled, (state, action) => {
        state.onboardingStep = action.payload.data;
      })
      .addCase(showOnboardingStep.rejected, (state) => {});
    // ================== show  =================
    builder
      .addCase(editOnboardingStep.pending, (state) => {})
      .addCase(editOnboardingStep.fulfilled, (state, action) => {
        toast.success("Successfully");
        state.onboardingSteps = useEdit(state.onboardingSteps, action);
      })
      .addCase(editOnboardingStep.rejected, (state) => {
        toast.success("Failed");
      });
    // ================== completed  =================
    builder
      .addCase(completeOnboardingStep.pending, (state) => {})
      .addCase(completeOnboardingStep.fulfilled, (state, action) => {
        toast.success("Successfully");
        state.onboardingSteps = useEdit(state.onboardingSteps, action);
      })
      .addCase(completeOnboardingStep.rejected, (state, action) => {
        toast.error("Please complete all information");
      });
    // ================== Destroy  =================
    builder
      .addCase(destroyOnboarding.pending, (state) => {})
      .addCase(destroyOnboarding.fulfilled, (state, action) => {
        state.onboardingSample = useDestroy(state.onboardingSample, action);
        toast.success("Destroy Successfully !");
      })
      .addCase(destroyOnboarding.rejected, (state) => {
        toast.error("Destroy Successfully !");
      });

    // ================== Destroy  =================
    builder
      .addCase(destroyOnboardingStep.pending, (state) => {})
      .addCase(destroyOnboardingStep.fulfilled, (state, action) => {
        state.onboardingSteps = useDestroy(state.onboardingSteps, action);
        toast.success("Destroy Successfully !");
      })
      .addCase(destroyOnboardingStep.rejected, (state) => {
        toast.error("Destroy Successfully !");
      });
  },
});

export const { sortOnboardingAsc, sortOnboardingDesc } =
  onboardingSlice.actions;

export const staffOnboardingSelector = (state) =>
  state.onboarding.staffOnboarding;
export const onboardingSampleSelector = (state) =>
  state.onboarding.onboardingSample;
export const onboardingStepsSelector = (state) =>
  state.onboarding.onboardingSteps;
export const onboardingStepSelector = (state) =>
  state.onboarding.onboardingStep;
export const onboardingSampleStepSelector = (state) =>
  state.onboarding.onboardingSampleStep;

export default onboardingSlice.reducer;
