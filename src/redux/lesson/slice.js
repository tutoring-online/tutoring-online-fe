import { createSlice } from "@reduxjs/toolkit"
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    lessons: [],
    filteredLessons: [],
    lessonDetail: null
}

const reducers = {
    fetchLessonsSuccessful: (state, action) => {
        state.lessons = action.payload;
    },
    fetchLessonsFailed: (state) => {
        state.lessons = [];
    },

    fetchLessonsWithFilterSuccessful: (state, action) => {
        state.filteredLessons = action.payload;
    },
    fetchLessonsWithFilterFailed: (state) => {
        state.filteredLessons = [];
    },

    fetchLessonDetailSuccessful: (state, action) => {
        state.lessonDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchLessonDetailFailed: (state) => {
        state.lessonDetail = null
    },
}

const slice = createSlice({
    name: "lessonReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_LESSON_DETAIL]: (state) => {
            state.lessonDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchLessons.fulfilled, reducers.fetchLessonsSuccessful);
        builder.addCase(asyncThunks.fetchLessons.rejected, reducers.fetchLessonsFailed);

        builder.addCase(asyncThunks.fetchLessonsWithFilter.fulfilled, reducers.fetchLessonsWithFilterSuccessful);
        builder.addCase(asyncThunks.fetchLessonsWithFilter.rejected, reducers.fetchLessonsWithFilterFailed);

        builder.addCase(asyncThunks.fetchLessonDetail.fulfilled, reducers.fetchLessonDetailSuccessful);
        builder.addCase(asyncThunks.fetchLessonDetail.rejected, reducers.fetchLessonDetailFailed);
    },
})

export const lessonReducer = slice.reducer;
export const actions = slice.actions;

export default slice;