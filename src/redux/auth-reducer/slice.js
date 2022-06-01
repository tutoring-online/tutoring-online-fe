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

        }
    },
})

export default slice;