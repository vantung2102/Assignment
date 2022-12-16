import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";

const initialState = {
  status: null,
  user: {},
  token: {},
};

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (email, password) => {
    const response = apiClient.post("api/v1/authentication/log_in", {
      headers: { email: email, password: password },
    });

    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const loginSelector = (state) => state.auth.token;

export default authSlice.reducer;
