import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSice";



const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})

export default store