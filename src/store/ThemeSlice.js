import { createSlice } from "@reduxjs/toolkit";


const initialState = { isThemeActivate: false}
const themeSlice = createSlice({
  name: "theme",
  initialState:initialState,
  reducers: {
    themeActivation(state) {
      state.isThemeActivate = !state.isThemeActivate;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
