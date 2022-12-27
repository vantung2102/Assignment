import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "../features/staff/staffSlice";
import departmentReducer from "../features/department/departmentSlice";
import positionReducer from "../features/position/positionSlice";
import jobTitleReducer from "../features/jobTitle/jobTitleSlice";
import authReducer from "../features/auth/authSlice";
import propertyGroupReducer from "../features/propertyGroup/propertyGroupSlice";
import propertyReducer from "../features/property/propertySlice";
import requestPropertyReducer from "../features/requestProperty/requestPropertySlice";

export const store = configureStore({
  reducer: {
    staff: staffReducer,
    department: departmentReducer,
    position: positionReducer,
    jobTitle: jobTitleReducer,
    auth: authReducer,
    propertyGroup: propertyGroupReducer,
    property: propertyReducer,
    requestProperty: requestPropertyReducer,
  },
});
