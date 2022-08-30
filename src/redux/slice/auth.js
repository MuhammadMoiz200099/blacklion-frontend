import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

import { toast } from "react-toastify";
import { destroySpotifySession } from "../../utils/spotifyApiServiceHandler";

const initialState = {
  status: "idle",
  user: null,
};

export const login = createAsyncThunk("auth/login", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "POST",
      url: "/auth/login",
      data,
    }),
    thunkAPI
  );
  return response;
});

export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/auth/forget-password",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/auth/reset-password",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const me = createAsyncThunk("auth/me", (_, thunkAPI) => {
  clients.default.client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: "/auth/me",
    }),
    thunkAPI
  );
  return response;
});

export const addUser = createAsyncThunk(
  "auth/addUser",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/user",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.clear();
      destroySpotifySession();
      delete clients.default.client.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: {
    [forgotpassword.pending]: (state) => {
      state.status = "loading";
    },
    [forgotpassword.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Email has been sent to you associated account.");
    },
    [forgotpassword.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [resetpassword.pending]: (state) => {
      state.status = "loading";
    },
    [resetpassword.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Your password has been changed");
    },
    [resetpassword.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      const user = action.payload.data;
      state.status = "succeeded";
      state.user = user;
      localStorage.setItem("accessToken", user.accessToken);
      toast.success("Logged in successfully");
      clients.default.client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      destroySpotifySession();
      toast.error(action.payload.data.message);
    },
    [me.pending]: (state) => {
      state.status = "loading";
    },
    [me.fulfilled]: (state, action) => {
      const user = action.payload.data;
      state.status = "succeeded";
      state.user = user;
      user.accessToken = localStorage.getItem("accessToken");
    },
    [me.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [addUser.pending]: (state) => {
      state.status = "loading";
    },
    [addUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("User Created Successfully");
    },
    [addUser.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
