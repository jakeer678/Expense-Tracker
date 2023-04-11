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
      console.log(state.idToken, "oooooooo");
    },
    logout(state, action) {
      state.idToken = localStorage.clear();
      state.islogin = false;
      state.idToken = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
