import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";

const INITIAL_STATE = {
    tutorSubjects: [],
    tutorDetail: [],
}

const reducers = {
    fetchTutorSubjectsSuccessful: (state, action) => {
        state.tutorSubjects = action.payload;
    },
    fetchTutorSubjectsFailed: (state) => {
        state.tutorSubjects = [];
    },
}

const slice = createSlice({
    name: "tutorSubjectReducer",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchTutorSubjects.fulfilled, reducers.fetchTutorSubjectsSuccessful);
        builder.addCase(asyncThunks.fetchTutorSubjects.rejected, reducers.fetchTutorSubjectsFailed);
    }
})

export const tutorSubjectReducer = slice.reducer;
export const actions = slice.actions;

export default slice;