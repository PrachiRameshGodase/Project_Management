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
  async ({  }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/notification/delete`, {  });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(fetchNotification({ user_id })); // Refetch updated notifications
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Mark a notification as read
export const markAsReadNotification = createAsyncThunk(
  "notification/markAsRead",
  async ({ }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/notification/read`, {});
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(fetchNotification()); // Refetch updated notifications
      }
      return response.data;
    } catch (error) {
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
