import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchTutors = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchTutors();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchTutorDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchTutorDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const updateTutor = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateTutor(id, data);

        callback(true, response);
        toast.success("Updated tutor successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the tutor.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteTutor = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteTutor(id);

        callback(true);
        toast.success("Deleted tutor successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the tutor.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchTutors: createAsyncThunk(types.FETCH_TUTORS, fetchTutors),
    fetchTutorDetail: createAsyncThunk(types.FETCH_TUTOR_DETAIL, fetchTutorDetail),
    updateTutor: createAsyncThunk(types.UPDATE_TUTOR, updateTutor),
    deleteTutor: createAsyncThunk(types.DELETE_TUTOR, deleteTutor),
}

export default asyncThunks;