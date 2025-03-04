import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://pm.codesquarry.com/api"; 


// Async thunk to fetch users list
export const fetchUsers = createAsyncThunk("users/fetchList", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/list`);
    console.log("response", response)

    return response.data; // Assuming the API returns a JSON object
    // console.log("response", response)
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk to fetch user details by ID
export const fetchUserDetails = createAsyncThunk("users/fetchDetails", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/details`, { params: { id: userId } });
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
      });
  },
});

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
