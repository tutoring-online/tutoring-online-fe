import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchSyllabuses = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchSyllabuses();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchSyllabusDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchSyllabusDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const createSyllabus = async (params) => {
    const { data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.createSyllabus(data);

        console.log(response)
        callback(true, response);
        toast.success("Created syllabus successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Failed to create syllabus.");
        throw error;
    } finally {
        loading(false);
    }
}

const updateSyllabus = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateSyllabus(id, data);

        callback(true, response);
        toast.success("Updated syllabus successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the syllabus.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteSyllabus = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteSyllabus(id);

        callback(true);
        toast.success("Deleted syllabus successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the syllabus.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchSyllabuses: createAsyncThunk(types.FETCH_SYLLABUSES, fetchSyllabuses),
    fetchSyllabusDetail: createAsyncThunk(types.FETCH_SYLLABUS_DETAIL, fetchSyllabusDetail),
    createSyllabus: createAsyncThunk(types.CREATE_SYLLABUS, createSyllabus),
    updateSyllabus: createAsyncThunk(types.UPDATE_SYLLABUS, updateSyllabus),
    deleteSyllabus: createAsyncThunk(types.DELETE_SYLLABUS, deleteSyllabus),
}

export default asyncThunks;