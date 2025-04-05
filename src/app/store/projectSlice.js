import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";


// Async thunk to add a new user
export const addProject = createAsyncThunk(
  "project/addProject",
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
  "project/fetchList",
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
export const fetchProjectDetails = createAsyncThunk("project/fetchDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project/details`, { id });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk to fetch user details by ID



// Async thunk to add a new task
export const addProjectTask = createAsyncThunk(
  "task/addProjectTask",
  async ({ projectData, router, itemId2, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/task/create`, projectData);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        dispatch(fetchProjectTasks({ project_id: itemId2 }))
        router.push(`/project/details?id=${itemId2}`); // Navigate on success
        localStorage.removeItem("itemId", itemId2)
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
export const fetchProjectTasks = createAsyncThunk(
  "task/fetchList",
  async (filters = {}, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/task/list`, filters);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch user details by ID
export const updateStatus = createAsyncThunk("project/updateStatus", async ({ id, project_status, dispatch, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project/status`, { id, project_status });
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      setDataLoading(false)
      dispatch(fetchProjectDetails(id))
      // router.push("/project/list"); // Navigate on success
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProjectStatus = createAsyncThunk("project/updateProjectStatus", async ({ id, status, dispatch, setDataLoading, project_id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project_status`, { id, status });
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      setDataLoading(false)
      dispatch(fetchProjectTasks({ project_id }))


      dispatch(fetchProjects()); // Refresh the list

    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProjectPriority = createAsyncThunk("project/updateProjectPriority", async ({ id, priority, dispatch, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project/priority`, { id, priority });
    if (response?.data?.success === true) {
      setDataLoading(false)
      toast.success(response?.data?.message);

      dispatch(fetchProjects());
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
// Async thunk to fetch user details by ID
export const fetchProjectTaskDetails = createAsyncThunk("task/fetchTaskDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/task/details`, { id });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk to fetch user details by ID
export const updateProjectTaskStatus = createAsyncThunk("task/updateProjectTaskStatus", async ({ id, task_status, dispatch, task_id, project_id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/task_status`, { id, task_status, task_id, project_id });
    if (response?.data?.success === true) {
      // toast.success(response?.data?.message);
      // router.push("/project/list"); // Navigate on success
      dispatch(fetchProjectTasks({ project_id: project_id, id: task_id }))
      dispatch(fetchProjectTaskDetails(id))
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Async thunk to fetch user details by ID
export const updateTaskStatus = createAsyncThunk("task/updateTaskStatus", async ({ id, status, dispatch, project_id, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/task/status`, { id, status, project_id });
    if (response?.data?.success === true) {
      setDataLoading(false)
      dispatch(fetchProjectDetails(project_id))
      // toast.success(response?.data?.message);
      // router.push("/project/list"); // Navigate on success

    }
    return response.data;
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateTaskPriority = createAsyncThunk("task/updateTaskPriority", async ({ id, priority, dispatch, project_id, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/task/priority`, { id, priority, project_id });
    if (response?.data?.success === true) {
      setDataLoading(false)

      dispatch(fetchProjectDetails(project_id))

    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchTaskComment = createAsyncThunk(
  "task/fetchTaskComment",
  async (filters = {}, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/comment/list`, filters);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const taskDelete = createAsyncThunk(
  "task/taskDeletes",
  async ({ id, dispatch, project_id, setDataLoading }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/task/rolledback`, { id: id });
      if (response?.data?.success) {
        toast.success("Task deleted successfully");
        setDataLoading(false)
        dispatch(fetchProjectTasks({project_id:project_id}))


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

export const updateProjectGithubFrontend = createAsyncThunk("task/updateProjectGithubFronted", async ({ id, github_frontend_date, dispatch, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project/github_frontend_date`, { id, github_frontend_date });
    if (response?.data?.success === true) {
      setDataLoading(false)
      dispatch(fetchProjects())



    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProjectGithubBackend = createAsyncThunk("project/updateProjectGithubBackend", async ({ id, github_backend_date, dispatch, setDataLoading }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/project/github_backend_date`, { id, github_backend_date });
    if (response?.data?.success === true) {
      // setDataLoading(false)
      dispatch(fetchProjects())

    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
export const addTaskComment = createAsyncThunk(
  "task/addTaskComment",
  async ({ formData, project_id, task_id, dispatch, setFormData, setSelectedFile, setAudioURL, setMentionList }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/comment/create`, formData);
      if (response?.data?.success === true) {
        // toast.success(response?.data?.message);
        dispatch(fetchTaskComment({ project_id, task_id }))
        setFormData({
          project_id: project_id,
          task_id: task_id,
          documents: [],
          audio_recording: "",
          assigned_ids: [],
          comments: "",
        });
        setSelectedFile(null)
        setAudioURL(null)
        setMentionList([])
      }
      return response.data;


    } catch (error) {
      console.error("Add Project API Error:", error);
      toast.error(response?.payload?.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const deleteTaskComment = createAsyncThunk("task/deleteTaskComment", async ({ id, project_id, task_id, dispatch ,setDataLoading}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/comment/destroy`, { id });
    if (response?.data?.success === true) {
      // toast.success(response?.data?.message);
      setDataLoading(false)
      dispatch(fetchTaskComment({ project_id, task_id }))
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk to fetch users list
export const fetchcommentUsers = createAsyncThunk(
  "project/fetchCUsersList",
  async (filters = {}, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/comment/users`, filters);

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const projectSlice = createSlice({
  name: "project",
  initialState: {
    taskCommentList: [],
    list: [],
    userlist: [],
    projectDetails: null,
    detailLoading: false,
    taskList: [],
    projectTaskDetails: null,
    taskListLoading: false,
    taskDetailsLoading: false,
    taskDeleteLoading: false,
    projectGitLoading: false,
    userLoading: false,
    loading: false,
    loading2: false,
    commentdLoading: false,

    commentLoading: false,

    error: null,
  },
  reducers: {
    clearProjectDetails: (state) => {
      state.projectDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Add Project
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Project List
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

      // Fetch project Details
      .addCase(fetchProjectDetails.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.projectDetails = action.payload;
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })


      // Handle Update Project Status
      .addCase(updateProjectStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.list || !Array.isArray(state.list)) {
          state.list = []; // Ensure state.list is an array before mapping
        }

        const updatedProject = action.payload;

        state.list = state.list.map(project =>
          project.id === updatedProject.id
            ? { ...project, status: updatedProject.status }
            : project
        );
      })
      .addCase(updateProjectStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle Update project Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Ensure state.list is an array before mapping
        if (!Array.isArray(state.list)) {
          state.list = [];
        }

        state.list = state.list.map(user =>
          user.id === updatedUser.id ? { ...user, project_status: updatedUser.project_status } : user
        );
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle Update project priority
      .addCase(updateProjectPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectPriority.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user status in the list
        const updatedProject = action.payload;

        // ✅ Ensure state.list is an array before using map()
        if (Array.isArray(state.list)) {
          state.list = state.list.map(user =>
            user.id === updatedProject.id ? { ...user, priority: updatedProject?.priority } : user
          );
        } else {
          state.list = [updatedProject]; // ✅ Ensure it's always an array
        }
      })
      .addCase(updateProjectPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Task
      .addCase(addProjectTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProjectTask.fulfilled, (state, action) => {
        state.loading = false;
        // state.taskList.push(action.payload);
      })
      .addCase(addProjectTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Task List
      .addCase(fetchProjectTasks.pending, (state) => {
        state.taskListLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.taskListLoading = false;
        state.taskList = action.payload;
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        state.taskListLoading = false;
        state.error = action.payload;
      })
      //task delete
      // Handle Update task github frontend
      .addCase(taskDelete.pending, (state) => {
        state.taskDeleteLoading = true;
        state.error = null;
      })
      .addCase(taskDelete.fulfilled, (state, action) => {
        state.taskDeleteLoading = false;
        const updatedUser = action.payload;

        // // Ensure state.list is an array before mapping
        // if (!Array.isArray(state.list)) {
        //   state.list = []; // Initialize as empty array if it's not already an array
        // }

        // // Update the list
        // state.list = state.list.map(user =>
        //   user.id === updatedUser.id
        //     ? { ...user, github_backend_date: updatedUser?.github_backend_date }
        //     : user
        // );
      })
      .addCase(taskDelete.rejected, (state, action) => {
        state.taskDeleteLoading = false;
        state.error = action.payload;
      })


      // task details
      .addCase(fetchProjectTaskDetails.pending, (state) => {
        state.taskDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectTaskDetails.fulfilled, (state, action) => {
        state.taskDetailsLoading = false;
        state.projectTaskDetails = action.payload;
      })
      .addCase(fetchProjectTaskDetails.rejected, (state, action) => {
        state.taskDetailsLoading = false;
        state.error = action.payload;
      })

      // Handle Update User Status
      .addCase(updateProjectTaskStatus.pending, (state) => {
        state.taskListLoading = true;
        state.error = null;
      })
      .addCase(updateProjectTaskStatus.fulfilled, (state, action) => {
        state.taskListLoading = false;
        // Update the user status in the list
        const updatedUser = action.payload;
        state.taskList = state.taskList.map(user =>
          user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
        );
      })
      .addCase(updateProjectTaskStatus.rejected, (state, action) => {
        state.taskListLoading = false;
        state.error = action.payload;
      })

      // Handle Update task Status
      .addCase(updateTaskStatus.pending, (state) => {
        state.taskListLoading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.taskListLoading = false;
        // Update the user status in the list




      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.taskListLoading = false;
        state.error = action.payload;
      })

      // Handle Update task Status
      .addCase(updateTaskPriority.pending, (state) => {
        state.taskListLoading = true;
        state.error = null;
      })
      .addCase(updateTaskPriority.fulfilled, (state, action) => {
        state.taskListLoading = false;

      })
      .addCase(updateTaskPriority.rejected, (state, action) => {
        state.taskListLoading = false;
        state.error = action.payload;
      })


      // Handle Update post github frontend
      .addCase(updateProjectGithubFrontend.pending, (state) => {
        state.projectGitLoading = true;
        state.error = null;
      })
      .addCase(updateProjectGithubFrontend.fulfilled, (state, action) => {
        state.projectGitLoading = false;
        const updatedUser = action.payload;

        // // Ensure state.list is an array before mapping
        // if (!Array.isArray(state.list)) {
        //   state.list = []; // Initialize as empty array if it's not already an array
        // }

        // // Update the list
        // state.list = state.list.map(user =>
        //   user.id === updatedUser.id
        //     ? { ...user, github_frontend_date: updatedUser?.github_frontend_date }
        //     : user
        // );
      })
      .addCase(updateProjectGithubFrontend.rejected, (state, action) => {
        state.projectGitLoading = false;
        state.error = action.payload;
      })

      // Handle Update task github frontend
      .addCase(updateProjectGithubBackend.pending, (state) => {
        state.projectGitLoading = true;
        state.error = null;
      })
      .addCase(updateProjectGithubBackend.fulfilled, (state, action) => {
        state.projectGitLoading = false;
        const updatedUser = action.payload;

        // // Ensure state.list is an array before mapping
        // if (!Array.isArray(state.list)) {
        //   state.list = []; // Initialize as empty array if it's not already an array
        // }

        // // Update the list
        // state.list = state.list.map(user =>
        //   user.id === updatedUser.id
        //     ? { ...user, github_backend_date: updatedUser?.github_backend_date }
        //     : user
        // );
      })
      .addCase(updateProjectGithubBackend.rejected, (state, action) => {
        state.projectGitLoading = false;
        state.error = action.payload;
      })

      // Add task Comment
      .addCase(addTaskComment.pending, (state) => {
        state.commentLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addTaskComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        
        // state.taskCommentList.push(action.payload)
      })
      .addCase(addTaskComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.error = action.payload;
      })

      // Fetch Task Comment List
      .addCase(fetchTaskComment.pending, (state) => {
        state.commentLoading = true;
        state.error = null;
      })
      .addCase(fetchTaskComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.taskCommentList = action.payload;
      })
      .addCase(fetchTaskComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.error = action.payload;
      })

      // Handle Delete Task Comment
      .addCase(deleteTaskComment.pending, (state) => {
        state.commentdLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskComment.fulfilled, (state, action) => {
        state.commentdLoading = false;
        // if (!Array.isArray(state.taskCommentList)) {
        //   state.taskCommentList = []; // Initialize as an empty array if it's not already an array
        // }
        // const updatedUser = action.payload;
        // state.taskCommentList = state.taskCommentList.map(user => user.id === updatedUser.id ? { ...user, id: updatedUser.id } : user);
      })
      .addCase(deleteTaskComment.rejected, (state, action) => {
        state.commentdLoading = false;
        state.error = action.payload;
      })

      //fetch commented user list
      // Fetch Project List
      .addCase(fetchcommentUsers.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(fetchcommentUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userlist = action.payload;
      })
      .addCase(fetchcommentUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload;
      })

  },
});

export const { clearProjectDetails } = projectSlice.actions;
export default projectSlice.reducer;
