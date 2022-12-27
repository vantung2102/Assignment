import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  meta: {},
  properties: null,
  property: null,
};

export const fetchProperties = createAsyncThunk("fetchProperties", async () => {
  const response = await apiClient.get(
    "/api/v1/property_management/properties",
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const showProperty = createAsyncThunk("showProperties", async (id) => {
  const response = await apiClient.get(
    `/api/v1/property_management/properties/${id}`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const newProperty = createAsyncThunk("newProperty", async (data) => {
  const response = await apiClient.post(
    "api/v1/property_management/properties",
    { property: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const editProperty = createAsyncThunk("editProperty", async (data) => {
  const response = await apiClient.put(
    `/api/v1/property_management/properties/${data.id}`,
    { property: { name: data.name, description: data.description } },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const destroyProperty = createAsyncThunk(
  "destroyProperty",
  async (id) => {
    const response = await apiClient.delete(
      `/api/v1/property_management/properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All properties =================
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data;
      })
      .addCase(fetchProperties.rejected, (state, action) => {});
    // ================== show properties =================
    builder
      .addCase(showProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.data;
      })
      .addCase(showProperty.rejected, (state) => {});
    // ================== New properties =================
    builder
      .addCase(newProperty.pending, (state) => {})
      .addCase(newProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload.data);
        toast.success("Create properties Successfully!");
      })
      .addCase(newProperty.rejected, (state) => {
        toast.error("Create properties failed!");
      });
    // ================== edit properties =================
    builder
      .addCase(editProperty.pending, (state) => {})
      .addCase(editProperty.fulfilled, (state, action) => {
        toast.success("Update properties Successfully!");
      })
      .addCase(editProperty.rejected, (state) => {});
    // ================== Destroy properties =================
    builder
      .addCase(destroyProperty.pending, (state) => {})
      .addCase(destroyProperty.fulfilled, (state, action) => {
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyProperty.rejected, (state) => {
        toast.error("Destroy Failed!");
      });
  },
});

export const propertiesSelector = (state) => state.property.properties;
export const propertySelector = (state) => state.property.property;

export default propertySlice.reducer;
