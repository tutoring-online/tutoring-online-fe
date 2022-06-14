import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchSubjects = createAsyncThunk(types.FETCH_SUBJECTS, async () => {
    try {
        const response = await api.fetchSubjects();
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchSubjects,
}

export default asyncThunks;