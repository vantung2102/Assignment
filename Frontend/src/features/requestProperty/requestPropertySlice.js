import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  meta: {},
  requestProperties: null,
  requestProperty: null,
  response: null,
};

export const fetchRequestProperties = createAsyncThunk(
  "fetchRequestProperties",
  async () => {
    const response = await apiClient.get(
      "/api/v1/request_management/request_properties",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const showRequestProperty = createAsyncThunk(
  "showRequestProperty",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/request_management/request_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const newRequestProperty = createAsyncThunk(
  "newRequestProperty",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/request_management/request_properties",
      { request_property: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const responseProperty = createAsyncThunk(
  "responseProperty",
  async (data) => {
    const response = await apiClient.post(
      `/api/v1/request_management/request_properties/${data.id}/response_request`,
      { response_type: data.type },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const editRequestProperty = createAsyncThunk(
  "editRequestProperty",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/request_management/request_properties/${data.id}`,
      { request_property: { name: data.name, description: data.description } },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const destroyRequestProperty = createAsyncThunk(
  "destroyRequestProperty",
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

export const commentRequestProperty = createAsyncThunk(
  "chatRequestProperty",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/comments",
      { comment: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const searchRequestProperty = createAsyncThunk(
  "searchRequestProperty",
  async (id) => {
    const response = await apiClient.post(
      "/api/v1/request_management/request_properties/requests_by_user",
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

export const RequestPropertyByStatus = createAsyncThunk(
  "requestPropertyByStatus",
  async (status) => {
    const response = await apiClient.post(
      `/api/v1/request_management/request_properties/requests_by_status`,
      { status: status },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const requestPropertySlice = createSlice({
  name: "RequestProperties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All =================
    builder
      .addCase(fetchRequestProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.requestProperties = action.payload.data;
      })
      .addCase(fetchRequestProperties.rejected, (state, action) => {});
    // ================== show =================
    builder
      .addCase(showRequestProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(showRequestProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.requestProperty = action.payload.data;
      })
      .addCase(showRequestProperty.rejected, (state) => {});
    // ================== response =================
    builder
      .addCase(responseProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(responseProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.requestProperty = action.payload.data;
      })
      .addCase(responseProperty.rejected, (state) => {});
    // ================== New =================
    builder
      .addCase(newRequestProperty.pending, (state) => {})
      .addCase(newRequestProperty.fulfilled, (state, action) => {
        state.requestProperties.unshift(action.payload.data);
        toast.success("Create Successfully!");
      })
      .addCase(newRequestProperty.rejected, (state) => {
        toast.error("Create failed!");
      });
    // ================== edit =================
    builder
      .addCase(editRequestProperty.pending, (state) => {})
      .addCase(editRequestProperty.fulfilled, (state, action) => {
        toast.success("Update Successfully!");
      })
      .addCase(editRequestProperty.rejected, (state) => {});
    // ================== Destroy =================
    builder
      .addCase(destroyRequestProperty.pending, (state) => {})
      .addCase(destroyRequestProperty.fulfilled, (state, action) => {
        state.requestProperties = state.requestProperties.filter(
          (item) => item.attributes.id !== action.payload
        );
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyRequestProperty.rejected, (state) => {
        toast.error("Destroy Failed!");
      });
    // ================== comment =================
    builder
      .addCase(commentRequestProperty.pending, (state) => {})
      .addCase(commentRequestProperty.fulfilled, (state, action) => {
        state.requestProperty.attributes.comments.push(
          action.payload.data.attributes
        );
      })
      .addCase(commentRequestProperty.rejected, (state) => {});
    // ================== search =================
    builder
      .addCase(searchRequestProperty.pending, (state) => {})
      .addCase(searchRequestProperty.fulfilled, (state, action) => {
        state.requestProperties = action.payload.data;
      })
      .addCase(searchRequestProperty.rejected, (state) => {});
    // ================== status filter =================
    builder
      .addCase(RequestPropertyByStatus.pending, (state) => {})
      .addCase(RequestPropertyByStatus.fulfilled, (state, action) => {
        state.requestProperties = action.payload.data;
      })
      .addCase(RequestPropertyByStatus.rejected, (state) => {});
  },
});

export const requestPropertiesSelector = (state) =>
  state.requestProperty.requestProperties;
export const requestPropertySelector = (state) =>
  state.requestProperty.requestProperty;

export default requestPropertySlice.reducer;
