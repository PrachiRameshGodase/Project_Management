import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";

// Async thunk to add a new user
export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ userData, router, section }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/create/update`, userData);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        if (section === "client") {
          router.push("/client/list");
        } else {
          router.push("/user/list");
        }
      }
      return response.data;
    } catch (error) {
      console.error("Add User API Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch users list
export const fetchUsers = createAsyncThunk(
  "users/fetchList",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/list`, filters);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch user details by ID
export const fetchUserDetails = createAsyncThunk(
  "users/fetchDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/details`, { id: userId });
      console.log("response", response.data)

      return response.data;
      // console.log("response", response)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update user status
export const updateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ id, status, router, section }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users_status`, { id, status });
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        if (section === "client") {
          router.push("/client/list");
        } else {
          router.push("/user/list");
        }
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    clientList: [], 
    employeeList: [],
    userDetails: null,
    listLoading:false,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        // toast.success("User added successfully!");
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Users (Separate Clients & Employees)
      .addCase(fetchUsers.pending, (state) => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.listLoading = false;
        if (action.meta.arg.is_client) {
          state.clientList = action.payload; // Store clients separately
        } else if (action.meta.arg.is_employee) {
          state.employeeList = action.payload; // Store employees separately
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload;
      })

      // Fetch User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.clientList = state.clientList.map(user =>
          user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
        );
        state.employeeList = state.employeeList.map(user =>
          user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
        );
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
