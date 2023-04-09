import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSice";
import expenseSlice from "./ExpenseSlice";
import themeSlice from "./ThemeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
