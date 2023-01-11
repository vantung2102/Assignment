import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy } from "../../common/hooks/hooks";

const initialState = {
  loading: true,
  meta: null,
  properties: null,
  property: null,
};

export const fetchProperties = createAsyncThunk(
  "fetchProperties",
  async (number) => {
    const response = await apiClient.get(
      `/api/v1/property_management/properties?page[number]=${
        number ? number : 1
      }`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

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
    {
      property: {
        code_seri: data.code_seri,
        name: data.name,
        brand: data.brand,
        group_property_id: data.group_property_id,
        price: data.price,
        date_buy: data.date_buy,
        number_of_repairs: data.number_of_repairs,
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

export const destroyProperty = createAsyncThunk(
  "destroyProperty",
  async (id) => {
    await apiClient.delete(`/api/v1/property_management/properties/${id}`, {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    });
    return id;
  }
);

export const acceptProperty = createAsyncThunk(
  "acceptProperty",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/property_management/properties/${data.id}/response_property_request`,
      { receiver_id: data.receiver_id },
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
        state.meta = action.payload.meta;
      })
      .addCase(fetchProperties.rejected, (state, action) => {});
    // ================== show properties =================
    builder
      .addCase(showProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.data.attributes;
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
        state.properties = useDestroy(state.properties, action);
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyProperty.rejected, (state) => {
        toast.error("Destroy Failed!");
      });
    // ================== Destroy properties =================
    builder
      .addCase(acceptProperty.pending, (state) => {})
      .addCase(acceptProperty.fulfilled, (state, action) => {
        state.property = action.payload.data.attributes;

        toast.success("Successfully!");
      })
      .addCase(acceptProperty.rejected, (state, action) => {
        toast.error("Failed!");
      });
  },
});

export const propertiesSelector = (state) => state.property.properties;
export const propertySelector = (state) => state.property.property;
export const metaPropertySelector = (state) => state.property.meta;

export default propertySlice.reducer;
