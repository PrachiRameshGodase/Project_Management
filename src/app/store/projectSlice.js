import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";


// Async thunk to add a new user
export const addProject = createAsyncThunk(
  "users/addProject",
  async ({ projectData, router }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/project/create`, projectData);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        router.push("/project/list"); // Navigate on success
      }
      return response.data;


    } catch (error) {
      console.error("Add Project API Error:", error);
      toast.error(response?.payload?.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch users list
export const fetchProjects = createAsyncThunk(
  "users/fetchList",
  async (filters = {}, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/project/list`, filters);

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
    const response = await axiosInstance.post(`/users/details`, { id: userId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk to fetch user details by ID
export const updateUserStatus = createAsyncThunk("users/updateUserStatus", async ({ id, status, router }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/users_status`, { id, status });
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      router.push("/user/list"); // Navigate on success
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Add User
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Project added successfully!";
        state.list.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Users List
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
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


      // Handle Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user status in the list
        const updatedUser = action.payload;
        state.list = state.list.map(user =>
          user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
        );
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export const { clearProjectDetails } = projectSlice.actions;
export default projectSlice.reducer;
