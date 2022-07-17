import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    tutors: [],
    filteredTutors: [],
    tutorDetail: null,
}

const reducers = {
    fetchTutorsSuccessful: (state, action) => {
        state.tutors = action.payload;
    },
    fetchTutorsFailed: (state) => {
        state.tutors = [];
    },

    fetchTutorsWithFilterSuccessful: (state, action) => {
        state.filteredTutors = action.payload;
    },
    fetchTutorsWithFilterFailed: (state) => {
        state.filteredTutors = [];
    },

    fetchTutorDetailSuccessful: (state, action) => {
        state.tutorDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchTutorDetailFailed: (state) => {
        state.tutorDetail = null
    },

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
        
        builder.addCase(asyncThunks.fetchTutorsWithFilter.fulfilled, reducers.fetchTutorsWithFilterSuccessful);
        builder.addCase(asyncThunks.fetchTutorsWithFilter.rejected, reducers.fetchTutorsWithFilterFailed);

        builder.addCase(asyncThunks.fetchTutorDetail.fulfilled, reducers.fetchTutorDetailSuccessful);
        builder.addCase(asyncThunks.fetchTutorDetail.rejected, reducers.fetchTutorDetailFailed);

        builder.addCase(asyncThunks.deleteTutor.fulfilled, reducers.deleteTutorSuccessful);
        builder.addCase(asyncThunks.deleteTutor.rejected, reducers.deleteTutorFailed);
    }
})

export const tutorReducer = slice.reducer;
export const actions = slice.actions;

export default slice;