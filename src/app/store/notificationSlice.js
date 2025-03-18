import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";

// Fetch notifications list
export const fetchNotification = createAsyncThunk(
  "notification/fetchList",
  async ({ sendData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/notification/list`, sendData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a notification
export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async ({ user_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/notification/delete`, { user_id }); // Pass user_id in the request body
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(fetchNotification({ user_id })); // Refetch updated notifications
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting notifications:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Mark a notification as read
export const markAsReadNotification = createAsyncThunk(
  "notification/markAsRead",
  async ({ user_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/notification/read`, { user_id }); // Include user_id in request
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(fetchNotification({ user_id })); // Refetch updated notifications
      }
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (notification) => notification.id !== action.meta.arg.user_id
        );
      })

      // Mark notification as read
      .addCase(markAsReadNotification.fulfilled, (state, action) => {
        state.list = state.list.map((notification) =>
          notification.id === action.meta.arg.notification_id
            ? { ...notification, read: true }
            : notification
        );
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
