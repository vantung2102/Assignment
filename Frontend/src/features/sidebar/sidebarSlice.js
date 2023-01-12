import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isOpen = action.payload;
    },
    closeSidebar: () => {},
  },
  extraReducers: (builder) => {},
});

export const { openSidebar } = sidebarSlice.actions;
export const isOpenSelector = (state) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
