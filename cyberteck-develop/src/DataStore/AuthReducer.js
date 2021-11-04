import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";

const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    return data && data.formType === "LOGIN"
      ? Api.Auth.login(data)
      : Api.Auth.registration(data);
  }
);

const contactUs = createAsyncThunk(
  "auth/contactUs",
  async (data, thunkAPI) => {
    return Api.Support.contactUs(data);
  }
);

const profileFetch = createAsyncThunk(
  "auth/profileDataFetch",
  async (data, thunkAPI) => {
    return Api.Auth.profileFetch(data);
  }
);

const profileUpdate = createAsyncThunk(
  "auth/profileUpdate",
  async (data, thunkAPI) => {
    return Api.Auth.profileUpdate(data);
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

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    resumedUser: false,
    login: {
      status: null,
      error: null,
    },
    contactUs: {
      status: null,
      error: null,
    },
    profileUpdate: {
      status: null,
      error: null,
    },
    profileFetch: {
      status: null,
      error: null,
      data: null
    },
  },
  reducers: {
    logout: (state) => {
      clearJwtFromLocal();
      state.userInfo = null;
      state.login.status = null;
      state.login.error = null;
    },
    resumeSession: (state) => {
      state.userInfo = getJwtFromLocal();
      state.resumedUser = true;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.login.status = "PENDING";
      state.login.error = null;
      state.userInfo = null;
    },
    [login.fulfilled]: (state, action) => {
      state.login.status = "FULFILLED";
      state.login.error = null;
      state.userInfo = action.payload.data;
      setJwtToLocal(action.payload.data);
    },
    [login.rejected]: (state, action) => {
      state.login.status = "REJECTED";
      state.login.error = {
        ...action.error,
        formType: action.meta.arg.formType
      };
      state.userInfo = null;
    },


    [contactUs.pending]: (state) => {
      state.contactUs.status = "PENDING";
      state.contactUs.error = null;
    },
    [contactUs.fulfilled]: (state, action) => {
      state.contactUs.status = "FULFILLED";
      state.login.error = null;
    },
    [contactUs.rejected]: (state, action) => {
      state.contactUs.status = "REJECTED";
      state.contactUs.error = action.error;
    },

    // PROFILE DATA
    [profileUpdate.pending]: (state) => {
      state.profileUpdate.status = "PENDING";
      state.profileUpdate.error = null;
    },
    [profileUpdate.fulfilled]: (state, action) => {
      state.profileUpdate.status = "FULFILLED";
      state.profileUpdate.error = null;
    },
    [profileUpdate.rejected]: (state, action) => {
      state.profileUpdate.status = "REJECTED";
      state.profileUpdate.error = action.error;
    },

    [profileFetch.pending]: (state) => {
      state.profileFetch.status = "PENDING";
      state.profileFetch.error = null;
    },
    [profileFetch.fulfilled]: (state, action) => {
      state.profileFetch.status = "FULFILLED";
      state.profileFetch.error = null;
      state.profileFetch.data = action.payload.data || {};
      state.profileFetch.data.dataStatus = true;

    },
    [profileFetch.rejected]: (state, action) => {
      state.profileFetch.status = "REJECTED";
      state.profileFetch.error = action.error;
    },
  },
});
const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
const { logout, resumeSession } = AuthSlice.actions;
export { login, resumeSession, logout, contactUs, profileFetch, profileUpdate };

