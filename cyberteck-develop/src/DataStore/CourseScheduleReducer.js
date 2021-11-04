import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const createCourseSchedule = createAsyncThunk(
  "courseSchedule/save",
  async (data, thunkAPI) => {
    return Api.CourseSchedule.create(data);
  }
);

const loadCourseSchedule = createAsyncThunk(
  "courseSchedule/load",
  async (courseId, thunkAPI) => {
    return Api.CourseSchedule.load(courseId);
  }
);

const removeCourseSchedule = createAsyncThunk(
  "courseSchedule/remove",
  async (data, thunkAPI) => {
    return Api.CourseSchedule.remove(data);
  }
);

const bookCourseSchedule = createAsyncThunk(
  "courseSchedule/book",
  async (data, thunkAPI) => {
    return Api.CourseSchedule.book(data);
  }
);



const CourseScheduleSlice = createSlice({
  name: "courseSchedule",
  initialState: {
    createCourseSchedule: {
      status: null,
      error: null,
      data: null
    },
    loadCourseSchedule: {
      status: null,
      error: null,
      data: null
    },
    removeCourseSchedule: {
      status: null,
      error: null,
      data: null
    },
    bookCourseSchedule: {
      status: null,
      error: null,
      data: null
    },
  },
  reducers: {
    clearCreateState: (state) => {
      state.createCourseSchedule.status = null;
      state.createCourseSchedule.error = null;
      state.createCourseSchedule.data = null;
    }
  },
  extraReducers: {
    [createCourseSchedule.pending]: (state) => {
      state.createCourseSchedule.status = "PENDING";
      state.createCourseSchedule.error = null;
      state.createCourseSchedule.data = null;
    },
    [createCourseSchedule.fulfilled]: (state, action) => {
      state.createCourseSchedule.status = "FULFILLED";
      state.createCourseSchedule.error = null;
      state.createCourseSchedule.data = action.payload.data;
    },
    [createCourseSchedule.rejected]: (state, action) => {
      state.createCourseSchedule.status = "REJECTED";
      state.createCourseSchedule.error = action.error;
      state.createCourseSchedule.data = null;
    },

    [loadCourseSchedule.pending]: (state) => {
      state.loadCourseSchedule.status = "PENDING";
      state.loadCourseSchedule.data = null;
      state.loadCourseSchedule.error = null;
    },
    [loadCourseSchedule.fulfilled]: (state, action) => {
      state.loadCourseSchedule.status = "FULFILLED";
      state.loadCourseSchedule.data = action.payload.data;
      state.loadCourseSchedule.error = null;
    },
    [loadCourseSchedule.rejected]: (state, action) => {
      state.loadCourseSchedule.status = "REJECTED";
      state.loadCourseSchedule.data = null;
      state.loadCourseSchedule.error = action.error;
    },


    [removeCourseSchedule.pending]: (state, action) => {
      state.removeCourseSchedule.status = "PENDING";
      state.removeCourseSchedule.data = null;
      state.removeCourseSchedule.error = null;
    },
    [removeCourseSchedule.fulfilled]: (state, action) => {
      state.removeCourseSchedule.status = "FULFILLED";
      state.removeCourseSchedule.data = action.payload.data;
      state.removeCourseSchedule.error = null;
      state.loadCourseSchedule.data.scheduleTime = state.loadCourseSchedule.data
        && state.loadCourseSchedule.data.scheduleTime
        && state.loadCourseSchedule.data.scheduleTime.filter(item => item.id != action.meta.arg.scheduleId);
    },
    [removeCourseSchedule.rejected]: (state, action) => {
      state.removeCourseSchedule.status = "REJECTED";
      state.removeCourseSchedule.data = null;
      state.removeCourseSchedule.error = action.error;
    },
    [bookCourseSchedule.pending]: (state) => {
      state.bookCourseSchedule.status = "PENDING";
      state.bookCourseSchedule.data = null;
      state.bookCourseSchedule.error = null;
    },
    [bookCourseSchedule.fulfilled]: (state, action) => {
      state.bookCourseSchedule.status = "FULFILLED";
      state.bookCourseSchedule.data = action.payload.data;
      state.bookCourseSchedule.error = null;
    },
    [bookCourseSchedule.rejected]: (state, action) => {
      state.bookCourseSchedule.status = "REJECTED";
      state.bookCourseSchedule.data = null;
      state.bookCourseSchedule.error = action.error;
    },
  },
});
const CourseScheduleReducer = CourseScheduleSlice.reducer;
export default CourseScheduleReducer;
const { clearCreateState } = CourseScheduleSlice.actions;
export { loadCourseSchedule, removeCourseSchedule, createCourseSchedule, bookCourseSchedule, clearCreateState };
