import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  meta: {},
  propertyProvidingHistories: null,
  propertyProvidingHistory: null,
  response: null,
  historiesByProperty: null,
};

export const fetchPropertyProvidingHistories = createAsyncThunk(
  "fetchPropertyProvidingHistories",
  async () => {
    const response = await apiClient.get(
      "/api/v1/property_management/property_providing_histories",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const showPropertyProvidingHistory = createAsyncThunk(
  "showPropertyProvidingHistory",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/property_management/property_providing_histories/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const newPropertyProvidingHistory = createAsyncThunk(
  "newPropertyProvidingHistory",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/property_management/property_providing_histories",
      { property_providing_history: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const propertyRecall = createAsyncThunk("recallProperty", async (id) => {
  const response = await apiClient.get(
    `/api/v1/property_management/property_providing_histories/${id}/property_recall`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );
  return response.data;
});

export const destroyPropertyProvidingHistory = createAsyncThunk(
  "destroyPropertyProvidingHistory",
  async (id) => {
    await apiClient.delete(
      `/api/v1/request_management/request_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return id;
  }
);

export const historiesByProperty = createAsyncThunk(
  "historiesByProperty",
  async (id) => {
    const response = await apiClient.post(
      `/api/v1/property_management/property_providing_histories/histories_by_property`,
      { property_id: id },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const propertyProvidingHistoriesSlice = createSlice({
  name: "RequestProperties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All =================
    builder
      .addCase(fetchPropertyProvidingHistories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyProvidingHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyProvidingHistories = action.payload.data;
      })
      .addCase(fetchPropertyProvidingHistories.rejected, (state, action) => {});
    // ================== show =================
    builder
      .addCase(showPropertyProvidingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(showPropertyProvidingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyProvidingHistory = action.payload.data;
      })
      .addCase(showPropertyProvidingHistory.rejected, (state) => {});
    // ================== response =================
    builder
      .addCase(propertyRecall.pending, (state) => {
        state.loading = true;
      })
      .addCase(propertyRecall.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyProvidingHistory = action.payload.data;
      })
      .addCase(propertyRecall.rejected, (state) => {
        toast.error("Recall failed!");
      });
    // ================== New =================
    builder
      .addCase(newPropertyProvidingHistory.pending, (state) => {})
      .addCase(newPropertyProvidingHistory.fulfilled, (state, action) => {
        state.propertyProvidingHistories.unshift(action.payload.data);
        toast.success("Create Successfully!");
      })
      .addCase(newPropertyProvidingHistory.rejected, (state) => {
        toast.error("Create failed!");
      });

    // ================== Destroy =================
    builder
      .addCase(destroyPropertyProvidingHistory.pending, (state) => {})
      .addCase(destroyPropertyProvidingHistory.fulfilled, (state, action) => {
        state.requestProperties = state.requestProperties.filter(
          (item) => item.attributes.id !== action.payload
        );
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyPropertyProvidingHistory.rejected, (state) => {
        toast.error("Destroy Failed!");
      });

    // ================== Destroy =================
    builder
      .addCase(historiesByProperty.pending, (state) => {})
      .addCase(historiesByProperty.fulfilled, (state, action) => {
        state.historiesByProperty = action.payload.data;
      })
      .addCase(historiesByProperty.rejected, (state) => {
        toast.error("Failed!");
      });
  },
});

export const propertyProvidingHistoriesSelector = (state) =>
  state.propertyProvidingHistories.propertyProvidingHistories;
export const PropertyProvidingHistorySelector = (state) =>
  state.propertyProvidingHistories.propertyProvidingHistory;
export const historiesByPropertySelector = (state) =>
  state.propertyProvidingHistories.historiesByProperty;

export default propertyProvidingHistoriesSlice.reducer;
