const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice"

export const store=configureStore({
    reducer:{
        auth: authReducer, 
        user: userReducer,
        project:projectReducer,
    }
})