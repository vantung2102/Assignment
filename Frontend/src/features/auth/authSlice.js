import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import apiClient from "../../apiClient/apiClient";

const initialState = {
  status: null,
  user: null,
  token: {},
  isAuthenticated: false,
  role: null,
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
    setRole: (state) => {
      if (!state.role || !state.user) state.role = null;
      const { role } = state.user.attributes.roles;
      if (role) state.role = role[0].name;
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
        state.user = action.payload.data;

        if (action.payload.data.attributes.roles.length > 0) {
          state.role = action.payload.data.attributes.roles[0].name;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        localStorage.setItem("isAuthenticated", "false");
        state.status = "error";
      });
  },
});

export const { logout, updateAuthenticated, getRole } = authSlice.actions;

export const loginSelector = (state) => state.auth.token;
export const getUserSelector = (state) => state.auth.user;
export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;
export const getRoleSelector = (state) => state.auth.role;

export default authSlice.reducer;
