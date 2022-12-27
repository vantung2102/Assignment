import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  meta: {},
  propertiesGroup: null,
  propertyGroup: null,
};

export const fetchPropertiesGroup = createAsyncThunk(
  "fetchPropertiesGroup",
  async () => {
    const response = await apiClient.get(
      "/api/v1/property_management/group_properties",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const showPropertiesGroup = createAsyncThunk(
  "showPropertiesGroup",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/property_management/group_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const newPropertiesGroup = createAsyncThunk(
  "newPropertiesGroup",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/property_management/group_properties",
      { group_property: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const editPropertiesGroup = createAsyncThunk(
  "editPropertiesGroup",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/property_management/group_properties/${data.id}`,
      { group_property: { name: data.name, description: data.description } },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const destroyPropertiesGroup = createAsyncThunk(
  "destroyPropertiesGroup",
  async (id) => {
    const response = await apiClient.delete(
      `/api/v1/property_management/group_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const propertyGroupSlice = createSlice({
  name: "propertyGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All propertiesGroup =================
    builder
      .addCase(fetchPropertiesGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertiesGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.propertiesGroup = action.payload.data;
      })
      .addCase(fetchPropertiesGroup.rejected, (state, action) => {});
    // ================== show propertiesGroup =================
    builder
      .addCase(showPropertiesGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(showPropertiesGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyGroup = action.payload.data;
      })
      .addCase(showPropertiesGroup.rejected, (state) => {});
    // ================== New propertiesGroup =================
    builder
      .addCase(newPropertiesGroup.pending, (state) => {})
      .addCase(newPropertiesGroup.fulfilled, (state, action) => {
        state.propertiesGroup.push(action.payload.data);
        toast.success("Create propertiesGroup Successfully!");
      })
      .addCase(newPropertiesGroup.rejected, (state) => {
        toast.error("Create propertiesGroup failed!");
      });
    // ================== edit propertiesGroup =================
    builder
      .addCase(editPropertiesGroup.pending, (state) => {})
      .addCase(editPropertiesGroup.fulfilled, (state, action) => {
        toast.success("Update propertiesGroup Successfully!");
      })
      .addCase(editPropertiesGroup.rejected, (state) => {});
    // ================== Destroy propertiesGroup =================
    builder
      .addCase(destroyPropertiesGroup.pending, (state) => {})
      .addCase(destroyPropertiesGroup.fulfilled, (state, action) => {
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyPropertiesGroup.rejected, (state) => {
        toast.error("Destroy Failed!");
      });
  },
});

export const propertiesGroupSelector = (state) =>
  state.propertyGroup.propertiesGroup;
export const propertyGroupSelector = (state) =>
  state.propertyGroup.propertyGroup;

export default propertyGroupSlice.reducer;
