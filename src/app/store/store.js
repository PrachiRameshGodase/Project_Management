const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice"
import dashboardReducer from "./dashboardSlice"
import notificationReducer from "./notificationSlice"
import mastersReducers from "./masterSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        project: projectReducer,
        dashboard: dashboardReducer,
        notification: notificationReducer,
        master:mastersReducers,
    }
})