import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchTutorSubjects = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchTutorSubjects();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const getTutorSubject = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.getTutorSubject(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const asyncThunks = {
    fetchTutorSubjects: createAsyncThunk(types.FETCH_TUTOR_SUBJECTS, fetchTutorSubjects),
    getTutorSubject: createAsyncThunk(types.GET_TUTOR_SUBJECT, getTutorSubject),
}

export default asyncThunks;