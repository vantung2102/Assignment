import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  status: null,
  isNew: false,
  meta: {},
  jobTitles: [],
  jobTitle: {
    attributes: {
      id: "",
      title: "",
      description: "",
      created_at: "",
      updated_at: "",
    },
  },
};

export const fetchJobTitle = createAsyncThunk("fetchJobTitle", async () => {
  const response = await apiClient.get("/api/v1/staff_management/job_titles", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });

  return response.data;
});

export const newJobTitle = createAsyncThunk("newJobTitle", async (data) => {
  const response = await apiClient.post(
    "api/v1/staff_management/job_titles",
    { job_title: data },
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const showJobTitle = createAsyncThunk("showJobTitle", async (id) => {
  const response = await apiClient.post(
    `api/v1/staff_management/job_titles/${id}`,
    {
      headers: {
        Authorization: Cookies.get("authorization"),
      },
    }
  );

  return response.data;
});

export const editJobTitle = createAsyncThunk(
  "staff/editJobTitle",
  async (id) => {
    const response = await apiClient.put(
      `/api/v1/staff_management/job_titles/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response;
  }
);

export const destroyJobTitle = createAsyncThunk(
  "staff/destroyJobTitle",
  async (id) => {
    const response = await apiClient.delete(
      `/api/v1/staff_management/job_titles/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response;
  }
);

export const jobTitleSlice = createSlice({
  name: "jobTitle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== all jobTitle =================
    builder
      .addCase(fetchJobTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobTitle.fulfilled, (state, action) => {
        state.jobTitles = action.payload.data;
      })
      .addCase(fetchJobTitle.rejected, (state) => {
        state.status = "error";
      });
    // ================== new jobTitle =================
    builder
      .addCase(newJobTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newJobTitle.fulfilled, (state) => {
        state.isNew = true;
        toast.success("Create job title successfully");
      })
      .addCase(newJobTitle.rejected, (state) => {
        state.status = "error";
        toast.success("Create job title failed");
      });
    // ================== edit jobTitle =================
    builder
      .addCase(editJobTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editJobTitle.fulfilled, (state) => {
        toast.success("edit job title successfully");
      })
      .addCase(editJobTitle.rejected, (state) => {
        state.status = "error";
        toast.success("edit job title failed");
      });
    // ================== destroy jobTitle =================
    builder
      .addCase(destroyJobTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(destroyJobTitle.fulfilled, (state) => {
        toast.success("destroy job title successfully");
      })
      .addCase(destroyJobTitle.rejected, (state) => {
        state.status = "error";
        toast.success("destroy job title failed");
      });
  },
});

export const jobTitlesSelector = (state) => state.jobTitle.jobTitles;
export const jobTitleSelector = (state) => state.jobTitle.jobTitle;
export const newJobTitleSelector = (state) => state.jobTitle.isNew;

export default jobTitleSlice.reducer;
