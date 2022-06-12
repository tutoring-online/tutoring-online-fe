import { createSlice } from '@reduxjs/toolkit'
import * as types from "./types";


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
            state.user = { ...action.payload }
        },
        [types.UNSUBSCRIBE_USER]: (state) => {
            state.isSignedIn = false;
            state.user = null
        },
    },
})

export const authReducer = slice.reducer;
export const actions = slice.actions;

export default slice;