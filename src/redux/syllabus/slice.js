import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    syllabuses: [],
    filteredSyllabuses: [],
    syllabusDetail: null
}

const reducers = {
    fetchSyllabusesSuccessful: (state, action) => {
        state.syllabuses = action.payload;
    },
    fetchSyllabusesFailed: (state) => {
        state.syllabuses = [];
    },

    fetchSyllabusesWithFilterSuccessful: (state, action) => {
        state.filteredSyllabuses = action.payload;
    },
    fetchSyllabusesWithFilterFailed: (state) => {
        state.filteredSyllabuses = [];
    },

    fetchSyllabusDetailSuccessful: (state, action) => {
        state.syllabusDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchSyllabusDetailFailed: (state) => {
        state.syllabusDetail = null
    },

    createSyllabusSuccessful: () => { },
    createSyllabusFailed: () => { },

    deleteSyllabusSuccessful: () => { },
    deleteSyllabusFailed: () => { },
}

const slice = createSlice({
    name: "syllabusReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_SYLLABUS_DETAIL]: (state) => {
            state.subjectDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchSyllabuses.fulfilled, reducers.fetchSyllabusesSuccessful);
        builder.addCase(asyncThunks.fetchSyllabuses.rejected, reducers.fetchSyllabusesFailed);

        builder.addCase(asyncThunks.fetchSyllabusesWithFilter.fulfilled, reducers.fetchSyllabusesWithFilterSuccessful);
        builder.addCase(asyncThunks.fetchSyllabusesWithFilter.rejected, reducers.fetchSyllabusesWithFilterFailed);

        builder.addCase(asyncThunks.fetchSyllabusDetail.fulfilled, reducers.fetchSyllabusDetailSuccessful);
        builder.addCase(asyncThunks.fetchSyllabusDetail.rejected, reducers.fetchSyllabusDetailFailed);

        builder.addCase(asyncThunks.createSyllabus.fulfilled, reducers.createSyllabusSuccessful);
        builder.addCase(asyncThunks.createSyllabus.rejected, reducers.createSyllabusFailed);
        
        builder.addCase(asyncThunks.deleteSyllabus.fulfilled, reducers.deleteSyllabusSuccessful);
        builder.addCase(asyncThunks.deleteSyllabus.rejected, reducers.deleteSyllabusFailed);
    }
})

export const syllabusReducer = slice.reducer;
export const actions = slice.actions;

export default slice;