import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";

const INITIAL_STATE = {
    tutorSubjects: [],
    tutorDetail: [],
    tutorSubject: []
}

const reducers = {
    fetchTutorSubjectsSuccessful: (state, action) => {
        state.tutorSubjects = action.payload;
    },
    fetchTutorSubjectsFailed: (state) => {
        state.tutorSubjects = [];
    },
    getTutorSubjectSuccessful: (state, action) => {
        state.tutorSubject = action.payload;
    },
    getTutorSubjectFailed: (state) => {
        state.tutorSubject = [];
    }
}

const slice = createSlice({
    name: "tutorSubjectReducer",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchTutorSubjects.fulfilled, reducers.fetchTutorSubjectsSuccessful);
        builder.addCase(asyncThunks.fetchTutorSubjects.rejected, reducers.fetchTutorSubjectsFailed);
        builder.addCase(asyncThunks.getTutorSubject.fulfilled, reducers.getTutorSubjectSuccessful);
        builder.addCase(asyncThunks.getTutorSubject.rejected, reducers.getTutorSubjectFailed);
    }
})

export const tutorSubjectReducer = slice.reducer;
export const actions = slice.actions;

export default slice;