import { createSlice } from '@reduxjs/toolkit'
import * as types from "./types";

import asyncThunks from "./asyncThunk";
import { toast } from 'react-toastify';


const INITIAL_STATE = {
    user: {},
    isSignedIn: false,
}

const slice = createSlice({
    name: "authReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.SUBSCRIBE_USER]: (state, action) => {
            state.isSignedIn = true;
            console.log(action.payload);
            state.user = { ...action.payload }
        },
        [types.UNSUBSCRIBE_USER]: (state) => {
            state.isSignedIn = false;
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload) {
                if (state.isSignedIn !== true) {
                    toast.success("Logged in successfully.");
                }
                state.isSignedIn = true;
                state.user = {
                    role: action.payload.role,
                    ...(action.payload.data[0] || {})
                }
                return;
            }

            state.isSignedIn = false;
            state.user = {}
        })

        builder.addCase(asyncThunks.loginUser.rejected, (state, action) => {
            console.log(action.error);
            state.isSignedIn = false;
            state.user = {}
        })
    }
})

export const authReducer = slice.reducer;
export const actions = slice.actions;
export default slice;