import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    students: [],
}

const slice = createSlice({
    name: "studentReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchStudents.fulfilled, (state, action) => {
            console.log(action.payload);
            state.students = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchStudents.rejected, (state, action) => {
            console.log(action.payload);
            state.students = [];
        })
    }
})

export const studentReducer = slice.reducer;
export const actions = slice.actions;

export default slice;