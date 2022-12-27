import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useDestroy } from "../../common/hooks/hooks";

const initialState = {
  status: null,
  meta: {},
  positions: [],
  position: null,
};

export const fetchPosition = createAsyncThunk("fetchPosition", async () => {
  const response = await apiClient.get("/api/v1/staff_management/positions", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return response.data;
});

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
  const response = await apiClient.get(
    `/api/v1/staff_management/positions/${data.id}`,
    {
      position: {
        name: data.name,
        description: data.description,
        department_id: data.department,
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
    const response = await apiClient.delete(
      `/api/v1/staff_management/positions/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return id;
  }
);

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== get all position =================
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = action.payload.data;
      })
      .addCase(fetchPosition.rejected, (state) => {
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
      .addCase(editPosition.fulfilled, (state) => {
        state.status = "succeeded";
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

export const positionsSelector = (state) => state.position.positions;
export const positionSelector = (state) => state.position.position;

export default positionSlice.reducer;
