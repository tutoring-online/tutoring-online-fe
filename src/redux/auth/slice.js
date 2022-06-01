import { createSlice } from '@reduxjs/toolkit'
import * as constants from "./constants";


const INITIAL_STATE = {
    name: null,
    email: null,
}

const slice = createSlice({
    name: constants.AUTH_REDUCER_NAME,
    initialState: INITIAL_STATE,
    reducers: {
        [constants.LOGIN_USER]: (state) => {
            console.log(state);
        }
    },
})

export const authReducer = slice.reducer;
export const actions = slice.actions;

export default slice;