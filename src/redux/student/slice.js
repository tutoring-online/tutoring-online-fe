import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";


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
        state.studentDetail = action.payload || null
    },
    fetchStudentDetailFailed: (state) => {
        state.studentDetail = null
    },

    updateStudentSuccessful: (state, action) => {
        state.studentDetail = action.payload
    },
    updateStudentFailed: () => {},

    deleteStudentSuccessful: () => {},
    deleteStudentFailed: () => {},
}

const slice = createSlice({
    name: "studentReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchStudents.fulfilled, reducers.fetchStudentsSuccessful);
        builder.addCase(asyncThunks.fetchStudents.rejected, reducers.fetchStudentsFailed);

        builder.addCase(asyncThunks.fetchStudentDetail.fulfilled, reducers.fetchStudentDetailSuccessful);
        builder.addCase(asyncThunks.fetchStudentDetail.rejected, reducers.fetchStudentDetailFailed);

        builder.addCase(asyncThunks.updateStudent.fulfilled, reducers.updateStudentSuccessful);
        builder.addCase(asyncThunks.updateStudent.rejected, reducers.updateStudentFailed);

        builder.addCase(asyncThunks.deleteStudent.fulfilled, reducers.deleteStudentSuccessful);
        builder.addCase(asyncThunks.deleteStudent.rejected, reducers.deleteStudentFailed);
    }
})

export const studentReducer = slice.reducer;
export const actions = slice.actions;

export default slice;