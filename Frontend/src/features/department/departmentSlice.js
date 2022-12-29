import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy, useEdit } from "../../common/hooks/hooks";

const initialState = {
  status: null,
  loading: true,
  meta: {},
  departments: [],
  department: null,
};

export const fetchDepartment = createAsyncThunk("fetchDepartment", async () => {
  const response = await apiClient.get("/api/v1/staff_management/departments", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });
  return response.data;
});

export const showDepartment = createAsyncThunk("showDepartment", async (id) => {
  const response = await apiClient.get(
    `/api/v1/staff_management/departments/${id}`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const newDepartment = createAsyncThunk("newDepartment", async (data) => {
  const response = await apiClient.post(
    "api/v1/staff_management/departments",
    { department: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

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

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    sortDepartment: (state) => {
      state.departments.sort((a, b) =>
        a.attributes.name > b.attributes.name
          ? 1
          : b.attributes.name > a.attributes.name
          ? -1
          : 0
      );
    },
    sortDepartmentDesc: (state) => {
      state.departments.reverse((a, b) =>
        a.attributes.name > b.attributes.name
          ? 1
          : b.attributes.name > a.attributes.name
          ? -1
          : 0
      );
    },
  },
  extraReducers: (builder) => {
    // ================== All Department =================
    builder
      .addCase(fetchDepartment.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.data;
      })
      .addCase(fetchDepartment.rejected, (state) => {
        state.status = "error";
        state.isAuthenticated = false;
      });
    // ================== show Department =================
    builder
      .addCase(showDepartment.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(showDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload.data;
      })
      .addCase(showDepartment.rejected, (state) => {
        state.status = "error";
      });
    // ================== New Department =================
    builder
      .addCase(newDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newDepartment.fulfilled, (state, action) => {
        state.departments.unshift(action.payload.data);
        toast.success("Create Department Successfully!");
      })
      .addCase(newDepartment.rejected, (state) => {
        state.status = "error";
        toast.error("Create Department failed!");
      });
    // ================== edit Department =================
    builder
      .addCase(editDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        state.departments = useEdit(state.departments, action);
        toast.success("Update Department Successfully!");
      })
      .addCase(editDepartment.rejected, (state) => {
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

export const { sortDepartment, sortDepartmentDesc } = departmentSlice.actions;

export const departmentsSelector = (state) => state.department.departments;
export const departmentSelector = (state) => state.department.department;
export const loadingDepartmentSelector = (state) => state.department.loading;

export default departmentSlice.reducer;
