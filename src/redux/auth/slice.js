import { createSlice } from '@reduxjs/toolkit'
import * as types from "./types";

import asyncThunks from "./asyncThunk";


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
            state.isSignedIn = true;
            if (action.payload) {
                state.user = {
                    role: action.payload.role,
                    ...(action.payload.data[0] || {})
                }
            }
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