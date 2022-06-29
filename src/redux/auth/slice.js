import { createSlice } from '@reduxjs/toolkit'
import * as types from "./types";

import asyncThunks from "./asyncThunk";
import { toast } from 'react-toastify';
import { isAvailableArray } from 'helpers/arrayUtils';
import { equalIgnoreCase } from 'helpers/stringUtils';


const INITIAL_STATE = {
    user: {},
    isSignedIn: false,
}

const showAuthenticatedSuccessfulMessage = (type) => {
    if (equalIgnoreCase(type, "login")) {
        toast.success("Logged in successfully.");
        return;
    }
    if (equalIgnoreCase(type, "signup")) {
        toast.success("Welcome you joining us.");
        return;
    }
    console.log(type);
}

const isNotSignedInYet = (isSignedIn) => isSignedIn !== true;

const reducers = {
    loginUserSuccessful: (state, action) => {
        const type = action.payload?.type;
        const role = action.payload?.role;
        const user = isAvailableArray(action.payload?.data) ? action.payload.data[0] : null;

        if (!type || !role || !user) {
            state.isSignedIn = false;
            state.user = null;

            const err = action.payload?.resultMessage || "Unknown";
            const message = `Authenticated failed with error: ${err}`;
            toast.error(message);
            throw new Error(message);
        }

        if (isNotSignedInYet(state.isSignedIn)) {
            showAuthenticatedSuccessfulMessage(type);
        }

        state.isSignedIn = true;
        state.user = { ...user, role }
    },

    loginUserFailed: (state, action) => {
        throw action.error;
    }
}

const slice = createSlice({
    name: "authReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.SUBSCRIBE_USER]: (state, action) => {
            state.isSignedIn = true;
            state.user = { ...action.payload }
        },
        [types.UNSUBSCRIBE_USER]: (state) => {
            state.isSignedIn = false;
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.loginUser.fulfilled, reducers.loginUserSuccessful)
        builder.addCase(asyncThunks.loginUser.rejected, reducers.loginUserFailed)
    }
})

export const authReducer = slice.reducer;
export const actions = slice.actions;
export default slice;