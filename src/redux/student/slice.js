import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    students: [],
    studentDetail: null,
}

const reducers = {
    fetchStudentsSuccessful: (state, action) => {
        state.students = action.payload;
    },
    fetchStudentsFailed: (state) => {
        state.students = [];
    },

    fetchStudentDetailSuccessful: (state, action) => {
        state.studentDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchStudentDetailFailed: (state) => {
        state.studentDetail = null
    },

    deleteStudentSuccessful: () => {},
    deleteStudentFailed: () => {},
}

const slice = createSlice({
    name: "studentReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_STUDENT_DETAIL]: (state) => {
            state.studentDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchStudents.fulfilled, reducers.fetchStudentsSuccessful);
        builder.addCase(asyncThunks.fetchStudents.rejected, reducers.fetchStudentsFailed);

        builder.addCase(asyncThunks.fetchStudentDetail.fulfilled, reducers.fetchStudentDetailSuccessful);
        builder.addCase(asyncThunks.fetchStudentDetail.rejected, reducers.fetchStudentDetailFailed);

        builder.addCase(asyncThunks.deleteStudent.fulfilled, reducers.deleteStudentSuccessful);
        builder.addCase(asyncThunks.deleteStudent.rejected, reducers.deleteStudentFailed);
    }
})

export const studentReducer = slice.reducer;
export const actions = slice.actions;

export default slice;