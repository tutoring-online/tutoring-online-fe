import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    subjects: [],
    subjectDetail: null
}

const reducers = {
    fetchSubjectsSuccessful: (state, action) => {
        state.subjects = action.payload;
    },
    fetchSubjectsFailed: (state) => {
        state.subjects = [];
    },

    fetchSubjectDetailSuccessful: (state, action) => {
        state.subjectDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchSubjectDetailFailed: (state) => {
        state.subjectDetail = null
    },

    createSubjectSuccessful: () => { },
    createSubjectFailed: () => { },

    deleteSubjectSuccessful: () => { },
    deleteSubjectFailed: () => { },
}

const slice = createSlice({
    name: "subjectReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_SUBJECT_DETAIL]: (state) => {
            state.subjectDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchSubjects.fulfilled, reducers.fetchSubjectsSuccessful);
        builder.addCase(asyncThunks.fetchSubjects.rejected, reducers.fetchSubjectsFailed);

        builder.addCase(asyncThunks.fetchSubjectDetail.fulfilled, reducers.fetchSubjectDetailSuccessful);
        builder.addCase(asyncThunks.fetchSubjectDetail.rejected, reducers.fetchSubjectDetailFailed);

        builder.addCase(asyncThunks.createSubject.fulfilled, reducers.createSubjectSuccessful);
        builder.addCase(asyncThunks.createSubject.rejected, reducers.createSubjectFailed);

        builder.addCase(asyncThunks.deleteSubject.fulfilled, reducers.deleteSubjectSuccessful);
        builder.addCase(asyncThunks.deleteSubject.rejected, reducers.deleteSubjectFailed);
    }
})

export const subjectReducer = slice.reducer;
export const actions = slice.actions;

export default slice;