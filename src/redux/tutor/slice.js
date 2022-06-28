import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    tutors: [],
    tutorDetail: [],
}

const reducers = {
    fetchTutorsSuccessful: (state, action) => {
        state.tutors = action.payload;
    },
    fetchTutorsFailed: (state) => {
        state.tutors = [];
    },

    fetchTutorDetailSuccessful: (state, action) => {
        state.tutorDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchTutorDetailFailed: (state) => {
        state.tutorDetail = null
    },

    updateTutorSuccessful: (state, action) => {
        state.tutorDetail = action.payload
    },
    updateTutorFailed: () => {},

    deleteTutorSuccessful: () => {},
    deleteTutorFailed: () => {},
}

const slice = createSlice({
    name: "tutorReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_TUTOR_DETAIL]: (state) => {
            state.tutorDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchTutors.fulfilled, reducers.fetchTutorsSuccessful);
        builder.addCase(asyncThunks.fetchTutors.rejected, reducers.fetchTutorsFailed);

        builder.addCase(asyncThunks.fetchTutorDetail.fulfilled, reducers.fetchTutorDetailSuccessful);
        builder.addCase(asyncThunks.fetchTutorDetail.rejected, reducers.fetchTutorDetailFailed);

        builder.addCase(asyncThunks.updateTutor.fulfilled, reducers.updateTutorSuccessful);
        builder.addCase(asyncThunks.updateTutor.rejected, reducers.updateTutorFailed);

        builder.addCase(asyncThunks.deleteTutor.fulfilled, reducers.deleteTutorSuccessful);
        builder.addCase(asyncThunks.deleteTutor.rejected, reducers.deleteTutorFailed);
    }
})

export const tutorReducer = slice.reducer;
export const actions = slice.actions;

export default slice;