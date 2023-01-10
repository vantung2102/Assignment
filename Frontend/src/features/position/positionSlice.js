import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDestroy, useEdit } from "../../common/hooks/hooks";
import { sortAsc, sortDesc } from "../../common/helpers/sort";

const initialState = {
  status: null,
  meta: null,
  positions: null,
  position: null,
  allPosition: null,
};

export const fetchPosition = createAsyncThunk(
  "fetchPosition",
  async (number) => {
    const response = await apiClient.get(
      `/api/v1/staff_management/positions?page[number]=${number ? number : 1}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const fetchAllPosition = createAsyncThunk(
  "fetchAllPosition",
  async () => {
    const response = await apiClient.get(
      "/api/v1/staff_management/positions/get_all_position",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const newPosition = createAsyncThunk("newPosition", async (data) => {
  const response = await apiClient.post(
    "api/v1/staff_management/positions",
    { position: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const showPosition = createAsyncThunk("showPosition", async (id) => {
  const response = await apiClient.get(
    `api/v1/staff_management/positions/${id}`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const editPosition = createAsyncThunk("editPosition", async (data) => {
  const response = await apiClient.put(
    `/api/v1/staff_management/positions/${data.id}`,
    {
      position: {
        name: data.name,
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
});

export const destroyPosition = createAsyncThunk(
  "destroyPosition",
  async (id) => {
    await apiClient.delete(`/api/v1/staff_management/positions/${id}`, {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    });

    return id;
  }
);

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    sortPositionAsc: (state) => sortAsc(state.positions, "name"),
    sortPositionDesc: (state) => sortDesc(state.positions, "name"),
  },
  extraReducers: (builder) => {
    // ================== index position =================
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchPosition.rejected, (state) => {
        state.status = "error";
      });
    // ================== get all position =================
    builder
      .addCase(fetchAllPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosition = action.payload.data;
      })
      .addCase(fetchAllPosition.rejected, (state) => {
        state.status = "error";
      });
    // ================== new position =================
    builder
      .addCase(newPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions.unshift(action.payload.data);
        toast.success("Create Position Success");
      })
      .addCase(newPosition.rejected, (state) => {
        state.status = "error";
        toast.error("Create Position failed");
      });
    // ================== show position =================
    builder
      .addCase(showPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.position = action.payload.data;
      })
      .addCase(showPosition.rejected, (state) => {
        state.status = "error";
      });
    // ================== new position =================
    builder
      .addCase(editPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = useEdit(state.positions, action);
        toast.success("update Position Success");
      })
      .addCase(editPosition.rejected, (state) => {
        state.status = "error";
        toast.error("update Position failed");
      });
    // ================== new position =================
    builder
      .addCase(destroyPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(destroyPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = useDestroy(state.positions, action);
        toast.success("destroy Position Success");
      })
      .addCase(destroyPosition.rejected, (state) => {
        state.status = "error";
        toast.error("destroy Position failed");
      });
  },
});

export const { sortPositionAsc, sortPositionDesc } = positionSlice.actions;

export const positionsSelector = (state) => state.position.positions;
export const positionSelector = (state) => state.position.position;
export const allPositionSelector = (state) => state.position.allPosition;
export const metaPositionSelector = (state) => state.position.meta;

export default positionSlice.reducer;
