import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "../features/staff/staffSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    staff: staffReducer,
    auth: authReducer,
  },
});
