import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const loadSchoolCourse = createAsyncThunk(
  "schoolCourses/loadSchoolCourse",
  async (data, thunkAPI) => {
    return Api.SchoolCourse.load(data);
  }
);

const saveSchoolCourse = createAsyncThunk(
  "saveSchoolCourse/saveSchoolCourse",
  async (data, thunkAPI) => {
    if(data.id){
      return Api.SchoolCourse.update(data);
    }else{
      return Api.SchoolCourse.create(data);
    }
  }
);
const bookSchoolCourse = createAsyncThunk(
  "saveSchoolCourse/bookSchoolCourse",
  async (data, thunkAPI) => {
    return Api.SchoolCourse.book(data);
  }
);

const SchoolCourseSlice = createSlice({
  name: "schoolCourses",
  initialState: {
    loadSchoolCourse: {
      status: null,
      error: null,
      data: null,
    },
    saveSchoolCourse: {
      status: null,
      error: null,
      data: null,
    },
    bookSchoolCourse: {
      status: null,
      error: null,
      data: null,
    }
  },
  reducers: {
    clearStoreState: (state) => {
      state.loadSchoolCourse.status = null;
      state.loadSchoolCourse.error = null;
      state.loadSchoolCourse.data = null;
    },
  },
  extraReducers: {
    [loadSchoolCourse.pending]: (state) => {
      state.loadSchoolCourse.status = "PENDING";
      state.loadSchoolCourse.error = null;
      state.loadSchoolCourse.data = null;
    },
    [loadSchoolCourse.fulfilled]: (state, action) => {
      state.loadSchoolCourse.status = "FULFILLED";
      state.loadSchoolCourse.error = null;
      state.loadSchoolCourse.data = action.payload.data;
    },
    [loadSchoolCourse.rejected]: (state, action) => {
      state.loadSchoolCourse.status = "REJECTED";
      state.loadSchoolCourse.error = action.error;
      state.loadSchoolCourse.data = null;
    },

    [saveSchoolCourse.pending]: (state) => {
      state.saveSchoolCourse.status = "PENDING";
      state.saveSchoolCourse.error = null;
      state.saveSchoolCourse.data = null;
    },
    [saveSchoolCourse.fulfilled]: (state, action) => {
      state.saveSchoolCourse.status = "FULFILLED";
      state.saveSchoolCourse.error = null;
      state.saveSchoolCourse.data = action?.payload?.data;
    },
    [saveSchoolCourse.rejected]: (state, action) => {
      state.saveSchoolCourse.status = "REJECTED";
      state.saveSchoolCourse.error = action.error;
      state.saveSchoolCourse.data = null;
    },

    [bookSchoolCourse.pending]: (state) => {
      state.bookSchoolCourse.status = "PENDING";
      state.bookSchoolCourse.error = null;
      state.bookSchoolCourse.data = null;
    },
    [bookSchoolCourse.fulfilled]: (state, action) => {
      state.bookSchoolCourse.status = "FULFILLED";
      state.bookSchoolCourse.error = null;
      state.bookSchoolCourse.data = action?.payload?.data;
    },
    [bookSchoolCourse.rejected]: (state, action) => {
      state.bookSchoolCourse.status = "REJECTED";
      state.bookSchoolCourse.error = action.error;
      state.bookSchoolCourse.data = null;
    },
  },
});
const SchoolCourseReducer = SchoolCourseSlice.reducer;
export default SchoolCourseReducer;
const { clearStoreState } = SchoolCourseSlice.actions;
export { loadSchoolCourse, saveSchoolCourse, bookSchoolCourse, clearStoreState };
