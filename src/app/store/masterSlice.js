import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";

// Async thunk to add a new user
export const addMaster = createAsyncThunk(
  "master/addMaster",
  async ({ userData, router }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/master/create/update`, userData);
      console.log("response", response)
      router.push(`/master/list`)
      // if (response?.data?.success === true) {
      //   toast.success(response?.data?.message);
      //   router.push(`/master/list}`); // Navigate on success
        
      // }
      if (response?.data?.message === "Master Recorded Successfully") {
        toast?.success(response?.data?.message);
        
        
    } 
      return response.data;
    } catch (error) {
      console.error("Add Post API Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch users list
export const fetchMaster = createAsyncThunk(
  "master/fetchList",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/master/list`, filters);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch user details by ID
export const masterDelete = createAsyncThunk(
  "master/masterDeletes",
  async ({id, dispatch, section, router}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/master/delete`, { id: id });
      if (response?.data?.success) {
        toast.success("Master deleted successfully");
        dispatch(fetchMaster())
        if(section=="main-master"){
          router.push("./list")
        }
        return response.data;
      } else {
        toast.error(response?.data?.message || "Failed to delete");
        return rejectWithValue(response?.data);
      }
     
     
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const masterSlice = createSlice({
  name: "master",
  initialState: {
    list: [], 
    postDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearpostDetails: (state) => {
      state.postDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add post
      .addCase(addMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMaster.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch posts
      .addCase(fetchMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Store clients separately
       
      })
      .addCase(fetchMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Master
      .addCase(masterDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(masterDelete.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.list = state.list.map(user =>
          user.id === updatedUser.id ? { ...user, id: updatedUser.id } : user
        );
      })
      .addCase(masterDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

     
  },
});

export const { clearpostDetails } = masterSlice.actions;
export default masterSlice.reducer;
