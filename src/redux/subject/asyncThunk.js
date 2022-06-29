import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchSubjects = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchSubjects();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchSubjectDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchSubjectDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const createSubject = async (params) => {
    const { data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.createSubject(data);

        console.log(response)
        callback(true, response);
        toast.success("Created subject successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Failed to create subject.");
        throw error;
    } finally {
        loading(false);
    }
}

const updateSubject = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateSubject(id, data);

        callback(true, response);
        toast.success("Updated subject successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the subject.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteSubject = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteSubject(id);

        callback(true);
        toast.success("Deleted subject successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the subject.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchSubjects: createAsyncThunk(types.FETCH_SUBJECTS, fetchSubjects),
    fetchSubjectDetail: createAsyncThunk(types.FETCH_SUBJECT_DETAIL, fetchSubjectDetail),
    createSubject: createAsyncThunk(types.CREATE_SUBJECT, createSubject),
    updateSubject: createAsyncThunk(types.UPDATE_SUBJECT, updateSubject),
    deleteSubject: createAsyncThunk(types.DELETE_SUBJECT, deleteSubject),
}

export default asyncThunks;