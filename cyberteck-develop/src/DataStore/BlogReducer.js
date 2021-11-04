import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const saveBlog = createAsyncThunk(
  "blog/save",
  async (data, thunkAPI) => {
    return data && data.blogId
      ? Api.Blog.update(data)
      : Api.Blog.create(data);
  }
);

const loadBlog = createAsyncThunk(
  "blog/load",
  async (data, thunkAPI) => {
    return Api.Blog.load(data);
  }
);

const loadAllBlog = createAsyncThunk(
  "blog/loadAll",
  async (query,thunkAPI) => {
    return Api.Blog.loadAll(query);
  }
);
const deleteBlog = createAsyncThunk(
  "course/deleteBlog",
  async (data, thunkAPI) => {
    return Api.Blog.delete(data);
  }
);



const BlogSlice = createSlice({
  name: "blog",
  initialState: {
    saveBlog: {
      status: null,
      error: null,
      data: null
    },
    deleteBlog: {
      status: null,
      error: null,
      data: null
    },
    loadBlog: {
      status: null,
      error: null,
      data: null
    },
    loadAllBlog:  {
      status: null,
      error: null,
      data: null
    },
  },
  reducers: {
    clearCreateState: (state) => {
      state.saveBlog.status = null;
      state.saveBlog.error = null;
      state.saveBlog.data = null;

      state.deleteBlog.status = null;
      state.deleteBlog.error = null;
      state.deleteBlog.data = null;
    }
  },
  extraReducers: {
    [deleteBlog.pending]: (state) => {
      state.deleteBlog.status = "PENDING";
      state.deleteBlog.error = null;
      state.deleteBlog.data = null;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.deleteBlog.status = "FULFILLED";
      state.deleteBlog.error = null;
      state.deleteBlog.data = action.payload.data;
    },
    [deleteBlog.rejected]: (state, action) => {
      state.deleteBlog.status = "REJECTED";
      state.deleteBlog.error = action.error;
      state.deleteBlog.data = null;
    },

    [loadBlog.pending]: (state) => {
      state.loadBlog.status = "PENDING";
      state.loadBlog.error = null;
      state.loadBlog.data = null;
    },
    [loadBlog.fulfilled]: (state, action) => {
      state.loadBlog.status = "FULFILLED";
      state.loadBlog.error = null;
      const data = action.payload.data;
      state.loadBlog.data = {...data, body: JSON.parse(data.body)};
      state.loadBlog.relatedPosts = action.payload.relatedPosts;
    },
    [loadBlog.rejected]: (state, action) => {
      state.loadBlog.status = "REJECTED";
      state.loadBlog.error = action.error;
      state.loadBlog.data = null;
    },

    [saveBlog.pending]: (state) => {
      state.saveBlog.status = "PENDING";
      state.saveBlog.data = null;
      state.saveBlog.error = null;
    },
    [saveBlog.fulfilled]: (state, action) => {
      state.saveBlog.status = "FULFILLED";
      state.saveBlog.data = action.payload.data;
      state.saveBlog.error = null;
    },
    [saveBlog.rejected]: (state, action) => {
      state.saveBlog.status = "REJECTED";
      state.saveBlog.data = null;
      state.saveBlog.error = action.error;
    },

    
    [loadAllBlog.pending]: (state) => {
      state.loadAllBlog.status = "PENDING";
      state.loadAllBlog.data = null;
      state.loadAllBlog.error = null;
    },
    [loadAllBlog.fulfilled]: (state, action) => {
      state.loadAllBlog.status = "FULFILLED";
      state.loadAllBlog.data = action.payload.data;
      state.loadAllBlog.error = null;
    },
    [loadAllBlog.rejected]: (state, action) => {
      state.loadAllBlog.status = "REJECTED";
      state.loadAllBlog.data = null;
      state.loadAllBlog.error = action.error;
    },
  },
});

const { clearCreateState } = BlogSlice.actions;

const BlogReducer = BlogSlice.reducer;
export default BlogReducer;
export { loadBlog, saveBlog, loadAllBlog, clearCreateState, deleteBlog };

