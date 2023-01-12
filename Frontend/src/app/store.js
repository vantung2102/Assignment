import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "../features/staff/staffSlice";
import departmentReducer from "../features/department/departmentSlice";
import positionReducer from "../features/position/positionSlice";
import jobTitleReducer from "../features/jobTitle/jobTitleSlice";
import authReducer from "../features/auth/authSlice";
import propertyGroupReducer from "../features/propertyGroup/propertyGroupSlice";
import propertyReducer from "../features/property/propertySlice";
import requestPropertyReducer from "../features/requestProperty/requestPropertySlice";
import propertyProvidingHistoriesReducer from "../features/propertyProvidingHistories/propertyProvidingHistoriesSlice";
import leaveReducer from "../features/leave/leaveSlice";
import leaveApplicationReducer from "../features/leaveApplication/leaveApplicationSlice";
import onboardingReducer from "../features/onboarding/onboardingSlice";
import performanceReducer from "../features/performance/performanceSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";

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
    propertyProvidingHistories: propertyProvidingHistoriesReducer,
    leave: leaveReducer,
    leaveApplication: leaveApplicationReducer,
    onboarding: onboardingReducer,
    performance: performanceReducer,
    sidebar: sidebarReducer,
  },
});
