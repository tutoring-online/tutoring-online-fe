import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchSyllabuses = createAsyncThunk(types.FETCH_SYLLABUSES, async () => {
    try {
        const response = await api.fetchSyllabuses();
        console.log(response);
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchSyllabuses,
}

export default asyncThunks;