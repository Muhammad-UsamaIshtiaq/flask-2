import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./../Api";

const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (data, thunkAPI) => {
    return Api.Auth.login(data);
  }
);

const resumeSession = createAsyncThunk(
  "auth/resumeSession",
  async (thunkAPI) => {
    return getJwtFromLocal();
  }
);

const registration = createAsyncThunk(
  "auth/registration",
  async (data, thunkAPI) => {
    return Api.Auth.registration(data);
  }
);

const setJwtToLocal = (data) => {
  localStorage.setItem("cyberteck_login", JSON.stringify(data));
};
const getJwtFromLocal = () => {
  const authData = localStorage.getItem("cyberteck_login");
  return JSON.parse(authData);
};

const clearJwtFromLocal = () => {
  localStorage.removeItem('cyberteck_login');
}

const logoutSession = createAsyncThunk(
  "auth/logoutSession",
  async (data, thunkAPI) => {
    return {};
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      status: "UNTOUCHED",
      error: null,
      data: {
        jwt: "",
        refresh: "",
        userId: "",
        firstName: "",
        lastName: "",
        userType: "",
      },
    },
    register: {
      status: "UNTOUCHED",
      error: null,
    },
    logout: {
      status: "UNTOUCHED",
      error: null,
    },
  },
  reducers: {
    cleanState: (state) => {
      state.login = {};
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.login.status = "PENDING";
      state.login.data = null;
      state.login.error = null;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.login.status = "FULFILLED";
      state.login.error = null;
      state.login.data = action.payload.data;
      setJwtToLocal(action.payload.data);
    },
    [loginThunk.rejected]: (state, action) => {
      state.login.status = "REJECTED";
      state.login.data = null;
      state.login.error = action.error;
    },




    [resumeSession.pending]: (state) => {
      state.login.status = "PENDING";
      state.login.data = null;
      state.login.error = null;
    },
    [resumeSession.fulfilled]: (state, action) => {
      if (action.payload) {
        state.login.status = "FULFILLED";
        state.login.error = null;
        state.login.data = action.payload;
      } else {
        state.login.status = "UNTOUCHED";
      }
    },
    [resumeSession.rejected]: (state, action) => {
      state.login.status = "REJECTED";
      state.login.data = null;
      state.login.error = action.error;
    },




    [registration.pending]: (state) => {
      state.register.status = "PENDING";
      state.register.error = null;
    },
    [registration.fulfilled]: (state, action) => {
      state.register.status = "FULFILLED";
      state.register.error = null;
      state.login.status = "FULFILLED";
      state.login.data = action.payload.data;
      setJwtToLocal(action.payload.data);
    },
    [registration.rejected]: (state, action) => {
      state.register.status = "REJECTED";
      state.register.error = action.error;
    },




    [logoutSession.pending]: (state) => {
      state.logout.status = "PENDING";
      state.logout.error = null;
    },
    [logoutSession.fulfilled]: (state, action) => {
      // LOGIN STATE TO DEFAULT
      state.login.status = "UNTOUCHED";
      state.login.error = null;

      state.logout.status = "FULFILLED";
      state.logout.error = "null";
      clearJwtFromLocal()
    },
    [logoutSession.rejected]: (state, action) => {
      state.login.status = "REJECTED";
      state.login.data = null;
      state.login.error = action.error;
    },
  },
});
const AuthReducer = authSlice.reducer;

export default AuthReducer;
export { loginThunk, resumeSession, registration, logoutSession };
