import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchStudents = createAsyncThunk(types.FETCH_STUDENTS, async () => {
    try {
        const response = await api.fetchStudents();
        console.log(response);
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchStudents,
}

export default asyncThunks;