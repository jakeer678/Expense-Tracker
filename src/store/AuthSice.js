import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  islogin: false,
  idToken: localStorage.getItem("idToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("idToken", action.payload);
      state.islogin = true;
      state.idToken = action.payload;
    },
    logout(state, action) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("userEmail");
      state.islogin = false;
      state.idToken = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
