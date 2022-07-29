import { createAsyncThunk } from "@reduxjs/toolkit"
import * as types from "./types";
import * as api from "./api";

const fetchLessons = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchLessons();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchLessonsWithFilter = async (params) => {
    const { filter, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchLessons(filter);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchLessonDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchLessonDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const asyncThunks = {
    fetchLessons: createAsyncThunk(types.FETCH_LESSONS, fetchLessons),
    fetchLessonsWithFilter: createAsyncThunk(types.FETCH_LESSONS_WITH_FILTER, fetchLessonsWithFilter),
    fetchLessonDetail: createAsyncThunk(types.FETCH_LESSON_DETAIL, fetchLessonDetail),
}

export default asyncThunks;