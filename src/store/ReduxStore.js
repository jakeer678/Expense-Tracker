import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSice";
import expenseSlice from "./ExpenseSlice";



const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer
    }
})

export default store