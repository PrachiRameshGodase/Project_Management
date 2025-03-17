// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../Config/axiosInstance";

// // API URL
// const API_URL = "https://pm.codesquarry.com/api/login";

// // Async thunk for login using Axios
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response =await axiosInstance.post(API_URL, credentials)

//       // Extract token from API response
//       const token = response.data.access_token;

//       // Store token in localStorage
//       localStorage.setItem("access_token", token);

//       return response.data; // Return the full response data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, token: null, loading: false, error: null },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("access_token"); // Remove token on logout
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.access_token; // Store token in Redux state
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";

const API_URL = "https://pm.codesquarry.com/api/login";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL, credentials);
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Fetch logged-in user data
export const fetchLoggedInUser = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found");

      // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.post("/user/getloggedinuser");

      // Store user data in localStorage
      localStorage.setItem("UserData", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("UserData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
