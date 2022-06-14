import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchTutors = createAsyncThunk(types.FETCH_TUTORS, async () => {
    try {
        const response = await api.fetchTutors();
        console.log(response);
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchTutors,
}

export default asyncThunks;