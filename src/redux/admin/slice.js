import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    admins: [],
}

const slice = createSlice({
    name: "adminReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchAdmins.fulfilled, (state, action) => {
            console.log(action.payload);
            state.admins = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchAdmins.rejected, (state, action) => {
            console.log(action.payload);
            state.admins = [];
        })
    }
})

export const adminReducer = slice.reducer;
export const actions = slice.actions;

export default slice;