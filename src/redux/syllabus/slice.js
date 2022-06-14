import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    syllabuses: [],
}

const slice = createSlice({
    name: "syllabusReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchSyllabuses.fulfilled, (state, action) => {
            console.log(action.payload);
            state.syllabuses = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchSyllabuses.rejected, (state, action) => {
            console.log(action.payload);
            state.syllabuses = [];
        })
    }
})

export const syllabusReducer = slice.reducer;
export const actions = slice.actions;

export default slice;