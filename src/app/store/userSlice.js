import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";


// Async thunk to add a new user
export const addUser = createAsyncThunk(
  "users/addUser",
  async ({userData, router}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/create`, userData);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        router.push("/user/list"); // Navigate on success
      }
      return response.data;

      
    } catch (error) {
      console.error("Add User API Error:", error);
      toast.error(response?.payload?.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch users list
export const fetchUsers = createAsyncThunk(
  "users/fetchList",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/users/list`);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Async thunk to fetch user details by ID
export const fetchUserDetails = createAsyncThunk("users/fetchDetails", async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/users/details`,  { id: userId } );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    userDetails: null,
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
      state.successMessage = null;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "User added successfully!";
      state.list.push(action.payload);
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      // Fetch Users List
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
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
;
      
  },
});

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
