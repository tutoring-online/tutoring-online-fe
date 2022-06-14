import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as types from "./types";
import { isAvailableArray } from "helpers/arrayUtils";

const INITIAL_STATE = {
    allLessons: [],

}



const slice = createSlice({
    name: "lessonReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.FETCH_ALL_LESSON]: (state) => {
            
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        // builder.addCase(fetchUserById.fulfilled, (state, action) => {
        //     // Add user to the state array
        //     state.entities.push(action.payload)
        // })
    },
})

export const lessonReducer = slice.reducer;
export const actions = slice.actions;

export default slice;