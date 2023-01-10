import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiClient from "../../apiClient/apiClient";
import { sortAsc, sortDesc } from "../../common/helpers/sort";
import { useDestroy, useEdit } from "../../common/hooks/hooks";

const initialState = {
  loading: false,
  meta: null,
  profile: null,
  staffs: null,
  allStaff: null,
  staffChart: null,
  staffChartByNode: [],
};

export const fetchStaff = createAsyncThunk("fetchStaff", async (number) => {
  const response = await apiClient.get(
    `/api/v1/staff_management/staffs?page[number]=${number ? number : 1}`,
    {
      param: {
        page: { number: number },
      },
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const filterStaff = createAsyncThunk("filterStaff", async (data) => {
  const { fullname, department, position, job_title } = data;
  let url = "/api/v1/staff_management/staffs";
  if (fullname) url += `?fullname=${fullname}`;
  if (department) url += `?department=${department}`;
  if (position) url += `?position=${position}`;
  if (job_title) url += `?job_title=${job_title}`;

  const response = await apiClient.get(url, {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });
  return response.data;
});

export const fetchAllStaff = createAsyncThunk("fetchAllStaff", async () => {
  const response = await apiClient.get(
    `/api/v1/staff_management/staffs/get_all_staff`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
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
  const response = await apiClient.post(
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

export const editStaff = createAsyncThunk("editStaff", async (data) => {
  const response = await apiClient.put(
    `api/v1/staff_management/staffs/${data.id}`,
    {
      staff: {
        fullname: data.fullname,
        email: data.email,
        department_id: data.department_id,
        position_id: data.position_id,
        job_title_id: data.job_title_id,
        date_of_birth: data.date_of_birth,
        phone: data.phone,
        join_date: data.join_date,
        address: data.address,
        gender: data.gender,
        staff_id: data.staff_id,
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

export const updateStaffActivation = createAsyncThunk(
  "updateStaffActivation",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/staff_management/staffs/${data.id}/update_staff_activation_status`,
      {
        status: data.status,
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

export const destroyStaff = createAsyncThunk("destroyStaff", async (id) => {
  await apiClient.delete(`/api/v1/staff_management/staffs/${id}`, {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return id;
});

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    sortStaffAsc: (state) => sortAsc(state.staffs, "fullname"),
    sortStaffDesc: (state) => sortDesc(state.staffs, "fullname"),
  },
  extraReducers: (builder) => {
    // ================== index Staff =================
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.meta = action.payload.meta;
        state.staffs = action.payload.data;
      })
      .addCase(fetchStaff.rejected, (state) => {
        state.loading = true;
      });
    // ================== filter Staff =================
    builder
      .addCase(filterStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterStaff.fulfilled, (state, action) => {
        state.meta = action.payload.meta;
        state.staffs = action.payload.data;
      })
      .addCase(filterStaff.rejected, (state) => {
        state.loading = false;
      });
    // ================== all Staff =================
    builder
      .addCase(fetchAllStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.allStaff = action.payload.data;
      })
      .addCase(fetchAllStaff.rejected, (state) => {
        state.loading = false;
      });
    // ================== Profile =================
    builder
      .addCase(newStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(newStaff.fulfilled, (state, action) => {
        state.staffs.unshift(action.payload.data);
        toast.success("Create employee Success");
      })
      .addCase(newStaff.rejected, (state) => {
        state.loading = false;
        toast.error("Create employee failed");
      });
    // ================== Profile =================
    builder
      .addCase(editStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(editStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = useEdit(state.staffs, action);
        toast.success("edit employee Success");
      })
      .addCase(editStaff.rejected, (state, action) => {
        state.loading = false;
        toast.error("edit employee failed");
      });

    // ================== Profile =================
    builder
      .addCase(updateStaffActivation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStaffActivation.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(updateStaffActivation.rejected, (state) => {
        state.loading = false;
        toast.error("Activation failed");
      });
    // ================== Profile =================
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      });
    // ================== Chart =================
    builder
      .addCase(fetchStaffChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffChart.fulfilled, (state, action) => {
        state.staffChart = action.payload.data;
      })
      .addCase(fetchStaffChart.rejected, (state) => {
        state.loading = false;
      });
    // ================== Destroy =================
    builder
      .addCase(destroyStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(destroyStaff.fulfilled, (state, action) => {
        state.staffs = useDestroy(state.staffs, action);
        toast.success("Destroy Successfully !");
      })
      .addCase(destroyStaff.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { sortStaffAsc, sortStaffDesc } = staffSlice.actions;

export const staffsSelector = (state) => state.staff.staffs;
export const profileSelector = (state) => state.staff.profile;
export const staffChartSelector = (state) => state.staff.staffChart;
export const staffChartByNodeSelector = (state) => state.staff.staffChartByNode;
export const allStaffSelector = (state) => state.staff.allStaff;
export const metaStaffSelector = (state) => state.staff.meta;
export const loadingStaff = (state) => state.staff.loading;

export default staffSlice.reducer;
