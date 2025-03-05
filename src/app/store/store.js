const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./authSlice";
import userReducer from "./userSlice";

export const store=configureStore({
    reducer:{
        auth: authReducer, 
        user: userReducer
    }
})