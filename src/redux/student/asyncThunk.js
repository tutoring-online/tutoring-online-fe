import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchStudents = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchStudents();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchStudentDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchStudentDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const updateStudent = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateStudent(id, data);

        callback(true, response);
        toast.success("Updated student successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the student.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteStudent = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteStudent(id);

        callback(true);
        toast.success("Deleted student successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the student.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchStudents: createAsyncThunk(types.FETCH_STUDENTS, fetchStudents),
    fetchStudentDetail: createAsyncThunk(types.FETCH_STUDENT_DETAIL, fetchStudentDetail),
    updateStudent: createAsyncThunk(types.UPDATE_STUDENT, updateStudent),
    deleteStudent: createAsyncThunk(types.DELETE_STUDENT, deleteStudent),
}

export default asyncThunks;