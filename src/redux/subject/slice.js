import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";


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
        state.subjectDetail = action.payload || null
    },
    fetchSubjectDetailFailed: (state) => {
        state.subjectDetail = null
    },

    createSubjectSuccessful: () => {},
    createSubjectFailed: () => {},

    updateSubjectSuccessful: (state, action) => {
        state.subjectDetail = action.payload
    },
    updateSubjectFailed: () => {},

    deleteSubjectSuccessful: () => {},
    deleteSubjectFailed: () => {},
}

const slice = createSlice({
    name: "subjectReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchSubjects.fulfilled, reducers.fetchSubjectsSuccessful);
        builder.addCase(asyncThunks.fetchSubjects.rejected, reducers.fetchSubjectsFailed);

        builder.addCase(asyncThunks.fetchSubjectDetail.fulfilled, reducers.fetchSubjectDetailSuccessful);
        builder.addCase(asyncThunks.fetchSubjectDetail.rejected, reducers.fetchSubjectDetailFailed);

        builder.addCase(asyncThunks.createSubject.fulfilled, reducers.createSubjectSuccessful);
        builder.addCase(asyncThunks.createSubject.rejected, reducers.createSubjectFailed);

        builder.addCase(asyncThunks.updateSubject.fulfilled, reducers.updateSubjectSuccessful);
        builder.addCase(asyncThunks.updateSubject.rejected, reducers.updateSubjectFailed);

        builder.addCase(asyncThunks.deleteSubject.fulfilled, reducers.deleteSubjectSuccessful);
        builder.addCase(asyncThunks.deleteSubject.rejected, reducers.deleteSubjectFailed);
    }
})

export const subjectReducer = slice.reducer;
export const actions = slice.actions;

export default slice;