<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    tutors: [],
=======
import { createSlice } from '@reduxjs/toolkit'
import * as types from "./types";

const INITIAL_STATE = {
    tutorProfile: {
        email: "linhse22222@fu.vn",
        name: "Linh",
        description: "Lorem Ipsum is simply dummy text of tpsum has been the industr"
    }
>>>>>>> 06abff4 (redux tutor profile)
}

const slice = createSlice({
    name: "tutorReducer",
    initialState: INITIAL_STATE,
    reducers: {
<<<<<<< HEAD

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchTutors.fulfilled, (state, action) => {
            console.log(action.payload);
            state.tutors = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchTutors.rejected, (state, action) => {
            console.log(action.payload);
            state.tutors = [];
        })
    }
=======
        [types.SET_TUTOR_PROFILE]: (state, action) => {
            state.tutorProfile = { ...action.payload }
        },
    },
>>>>>>> 06abff4 (redux tutor profile)
})

export const tutorReducer = slice.reducer;
export const actions = slice.actions;

export default slice;