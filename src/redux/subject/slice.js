import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    subjects: [],
}

const slice = createSlice({
    name: "subjectReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchSubjects.fulfilled, (state, action) => {
            console.log(action.payload);
            state.subjects = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchSubjects.rejected, (state, action) => {
            console.log(action.payload);
            state.subjects = [];
        })
    }
})

export const subjectReducer = slice.reducer;
export const actions = slice.actions;

export default slice;