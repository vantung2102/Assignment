import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import apiClient from "../../apiClient/apiClient";

const initialState = {
  status: null,
  user: null,
  token: {},
  isAuthenticated: false,
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  const response = await apiClient.post("api/auth/login", {
    email: payload.email,
    password: payload.password,
  });

  return response.data;
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const response = await apiClient.get("api/auth/get_current_user", {
    headers: {
      Authorization: Cookies.get("authorization"),
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      Cookies.remove("authorization");
      localStorage.setItem("isAuthenticated", "false");
    },
    updateAuthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        Cookies.set("authorization", action.payload.token, { path: "/" });
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
        localStorage.setItem("isAuthenticated", "false");
      });
    //  ==================== get user =================
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "error";
      });
  },
});

export const { logout, updateAuthenticated } = authSlice.actions;

export const loginSelector = (state) => state.auth.token;
export const getUserSelector = (state) => state.auth.user;
export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
