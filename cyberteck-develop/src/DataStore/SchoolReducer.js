import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const saveSchool = createAsyncThunk(
  "school/save",
  async (data, thunkAPI) => {
    return data && data.id
      ? Api.School.update(data)
      : Api.School.create(data);
  }
);

const loadSchool = createAsyncThunk(
  "school/load",
  async (data, thunkAPI) => {
    return Api.School.load(data);
  }
);

const loadAllSchool = createAsyncThunk(
  "school/loadAll",
  async (query, thunkAPI) => {
    return Api.School.loadAll(query);
  }
);

const loadAllEnrolledCourses = createAsyncThunk(
  "school/loadAllEnrolledCourses",
  async (data, thunkAPI) => {
    console.log("CALL IN THUNK");
    return Api.SchoolCourse.loadAllEnrolledSchoolCourses(data);
  }
);

const fetchDetailsList = createAsyncThunk(
  "school/fetchDetailsList",
  async (query, thunkAPI) => {
    return Api.School.fetchDetailList(query);
  }
);



const SchoolSlice = createSlice({
  name: "school",
  initialState: {
    saveSchool: {
      status: null,
      error: null,
      data: null
    },
    loadAllEnrolledCourses: {
      status: null,
      error: null,
      data: null
    },
    loadSchool: {
      status: null,
      error: null,
      data: null
    },
    loadAllSchool: {
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
      state.saveSchool.status = null;
      state.saveSchool.error = null;
      state.saveSchool.data = null;

      state.loadSchool.status = null;
      state.loadSchool.error = null;
      state.loadSchool.data = null;

      state.loadAllSchool.status = null;
      state.loadAllSchool.error = null;
      state.loadAllSchool.data = null;
    }
  },
  extraReducers: {
    [loadSchool.pending]: (state) => {
      state.loadSchool.status = "PENDING";
      state.loadSchool.error = null;
      state.loadSchool.data = null;
    },
    [loadSchool.fulfilled]: (state, action) => {
      state.loadSchool.status = "FULFILLED";
      state.loadSchool.error = null;
      state.loadSchool.data = action.payload.data;
    },
    [loadSchool.rejected]: (state, action) => {
      state.loadSchool.status = "REJECTED";
      state.loadSchool.error = action.error;
      state.loadSchool.data = null;
    },

    [saveSchool.pending]: (state) => {
      state.saveSchool.status = "PENDING";
      state.saveSchool.data = null;
      state.saveSchool.error = null;
    },
    [saveSchool.fulfilled]: (state, action) => {
      state.saveSchool.status = "FULFILLED";
      state.saveSchool.data = action.payload.data;
      state.saveSchool.error = null;
    },
    [saveSchool.rejected]: (state, action) => {
      state.saveSchool.status = "REJECTED";
      state.saveSchool.data = null;
      state.saveSchool.error = action.error;
    },

    [loadAllEnrolledCourses.pending]: (state) => {
      state.loadAllEnrolledCourses.status = "PENDING";
      state.loadAllEnrolledCourses.data = null;
      state.loadAllEnrolledCourses.error = null;
    },
    [loadAllEnrolledCourses.fulfilled]: (state, action) => {
      state.loadAllEnrolledCourses.status = "FULFILLED";
      state.loadAllEnrolledCourses.data = action.payload.data;
      state.loadAllEnrolledCourses.error = null;
    },
    [loadAllEnrolledCourses.rejected]: (state, action) => {
      state.loadAllEnrolledCourses.status = "REJECTED";
      state.loadAllEnrolledCourses.data = null;
      state.loadAllEnrolledCourses.error = action.error;
    },


    [loadAllSchool.pending]: (state) => {
      state.loadAllSchool.status = "PENDING";
      state.loadAllSchool.data = null;
      state.loadAllSchool.error = null;
    },
    [loadAllSchool.fulfilled]: (state, action) => {
      state.loadAllSchool.status = "FULFILLED";
      state.loadAllSchool.data = action.payload.data;
      state.loadAllSchool.error = null;
    },
    [loadAllSchool.rejected]: (state, action) => {
      state.loadAllSchool.status = "REJECTED";
      state.loadAllSchool.data = null;
      state.loadAllSchool.error = action.error;
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
const SchoolReducer = SchoolSlice.reducer;
export default SchoolReducer;
const { clearStoreState } = SchoolSlice.actions;
export { loadSchool, saveSchool, loadAllSchool, fetchDetailsList, clearStoreState, loadAllEnrolledCourses };

