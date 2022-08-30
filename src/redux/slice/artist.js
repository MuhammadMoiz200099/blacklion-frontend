import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    artists: null,
    myArtists: null,
    artist: null,
};

export const getArtist = createAsyncThunk("artist/getArtist", (_, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: "/artist"
        }),
        thunkAPI
    );
    return response;
});
export const getMyArtist = createAsyncThunk("artist/getMyArtist", (_, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: "/artist/myArtist/current/list"
        }),
        thunkAPI
    );
    return response;
});
export const addToMyArtist = createAsyncThunk("artist/addToMyArtist", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: `/artist/addToMyArtist/${id}`
        }),
        thunkAPI
    );
    return response;
});
export const getArtistById = createAsyncThunk("artist/getArtistById", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: `/artist/${id}`
        }),
        thunkAPI
    );
    return response;
});
export const addArtist = createAsyncThunk("artist/addArtist", ({ data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "POST",
            url: "/artist",
            data
        }),
        thunkAPI
    );
    return response;
});
export const addArtistWithImage = createAsyncThunk("artist/addArtist", ({ data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "POST",
            url: "/artist/profile",
            data
        }),
        thunkAPI
    );
    return response;
});

export const updateArtist = createAsyncThunk("artist/updateArtist", ({ id, data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "PUT",
            url: `/artist/${id}`,
            data
        }),
        thunkAPI
    );
    return response;
});

export const updateArtistWithProfile = createAsyncThunk("artist/updateArtistWithProfile", ({ id, data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "PUT",
            url: `/artist/profile/${id}`,
            data
        }),
        thunkAPI
    );
    return response;
});

export const deleteArtist = createAsyncThunk("artist/deleteArtist", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "DELETE",
            url: `/artist/${id}`
        }),
        thunkAPI
    );
    return response;
});

export const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: {
        [getArtist.pending]: (state) => {
            state.status = "loading";
        },
        [getArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.artists = action.payload.data;
        },
        [getArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [getMyArtist.pending]: (state) => {
            state.status = "loading";
        },
        [getMyArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.myArtists = action.payload.data;
        },
        [getMyArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [addArtist.pending]: (state) => {
            state.status = "loading";
        },
        [addArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Artist Added Successfully");
        },
        [addArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [getArtistById.pending]: (state) => {
            state.status = "loading";
        },
        [getArtistById.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.artist = action.payload.data;
        },
        [getArtistById.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [updateArtist.pending]: (state) => {
            state.status = "loading";
        },
        [updateArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Artist Updated Successfully");
        },
        [updateArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [updateArtistWithProfile.pending]: (state) => {
            state.status = "loading";
        },
        [updateArtistWithProfile.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Artist Updated Successfully");
        },
        [updateArtistWithProfile.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [addToMyArtist.pending]: (state) => {
            state.status = "loading";
        },
        [addToMyArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Artist added to my artist successfully");
        },
        [addToMyArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [deleteArtist.pending]: (state) => {
            state.status = "loading";
        },
        [deleteArtist.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Artist Deleted Successfully");
        },
        [deleteArtist.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        }
    },
});

export default artistSlice.reducer;