import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    tutors: [],
}

const slice = createSlice({
    name: "tutorReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchTutors.fulfilled, (state, action) => {
            console.log(action.payload);
            state.tutors = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchTutors.rejected, (state, action) => {
            console.log(action.payload);
            state.tutors = [];
        })
    }
})

export const tutorReducer = slice.reducer;
export const actions = slice.actions;

export default slice;