import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const saveCourse = createAsyncThunk(
  "course/save",
  async (data, thunkAPI) => {
    return data && data.id
      ? Api.Course.update(data)
      : Api.Course.create(data);
  }
);

const loadCourse = createAsyncThunk(
  "course/load",
  async (data, thunkAPI) => {
    return Api.Course.load(data);
  }
);

const loadAllCourse = createAsyncThunk(
  "course/loadAll",
  async (query, thunkAPI) => {
    return Api.Course.loadAll(query);
  }
);

const fetchDetailsList = createAsyncThunk(
  "course/fetchDetailsList",
  async (query, thunkAPI) => {
    return Api.Course.fetchDetailList(query);
  }
);



const CourseSlice = createSlice({
  name: "course",
  initialState: {
    saveCourse: {
      status: null,
      error: null,
      data: null
    },
    loadCourse: {
      status: null,
      error: null,
      data: null
    },
    loadAllCourse: {
      status: null,
      error: null,
      data: null
    },
    fetchDetailsList: {
      status: null,
      error: null,
      data: null
    },
  },
  reducers: {
    clearStoreState: (state) => {
      state.saveCourse.status = null;
      state.saveCourse.error = null;
      state.saveCourse.data = null;

      state.loadCourse.status = null;
      state.loadCourse.error = null;
      state.loadCourse.data = null;
    }
  },
  extraReducers: {
    [loadCourse.pending]: (state) => {
      state.loadCourse.status = "PENDING";
      state.loadCourse.error = null;
      state.loadCourse.data = null;
    },
    [loadCourse.fulfilled]: (state, action) => {
      state.loadCourse.status = "FULFILLED";
      state.loadCourse.error = null;
      state.loadCourse.data = action.payload.data;
    },
    [loadCourse.rejected]: (state, action) => {
      state.loadCourse.status = "REJECTED";
      state.loadCourse.error = action.error;
      state.loadCourse.data = null;
    },

    [saveCourse.pending]: (state) => {
      state.saveCourse.status = "PENDING";
      state.saveCourse.data = null;
      state.saveCourse.error = null;
    },
    [saveCourse.fulfilled]: (state, action) => {
      state.saveCourse.status = "FULFILLED";
      state.saveCourse.data = action.payload.data;
      state.saveCourse.error = null;
    },
    [saveCourse.rejected]: (state, action) => {
      state.saveCourse.status = "REJECTED";
      state.saveCourse.data = null;
      state.saveCourse.error = action.error;
    },


    [loadAllCourse.pending]: (state) => {
      state.loadAllCourse.status = "PENDING";
      state.loadAllCourse.data = null;
      state.loadAllCourse.error = null;
    },
    [loadAllCourse.fulfilled]: (state, action) => {
      state.loadAllCourse.status = "FULFILLED";
      state.loadAllCourse.data = action.payload.data;
      state.loadAllCourse.error = null;
    },
    [loadAllCourse.rejected]: (state, action) => {
      state.loadAllCourse.status = "REJECTED";
      state.loadAllCourse.data = null;
      state.loadAllCourse.error = action.error;
    },

    [fetchDetailsList.pending]: (state) => {
      state.fetchDetailsList.status = "PENDING";
      state.fetchDetailsList.data = null;
      state.fetchDetailsList.error = null;
    },
    [fetchDetailsList.fulfilled]: (state, action) => {
      state.fetchDetailsList.status = "FULFILLED";
      state.fetchDetailsList.data = action.payload.data;
      state.fetchDetailsList.error = null;
    },
    [fetchDetailsList.rejected]: (state, action) => {
      state.fetchDetailsList.status = "REJECTED";
      state.fetchDetailsList.data = null;
      state.fetchDetailsList.error = action.error;
    },
  },
});
const CourseReducer = CourseSlice.reducer;
export default CourseReducer;
const { clearStoreState } = CourseSlice.actions;
export { loadCourse, saveCourse, loadAllCourse, fetchDetailsList, clearStoreState };

