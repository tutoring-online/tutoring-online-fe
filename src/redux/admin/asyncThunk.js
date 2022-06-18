import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchAdmins = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchAdmins();
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
}

const fetchAdminDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchAdminDetail(id);
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
}

const createAdmin = async (params) => {
    const { data, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.createAdmin(data);
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
}

const updateAdmin = async (params) => {
    const { id, data, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.updateAdmin(id, data);
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
}

const deleteAdmin = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.deleteAdmin(id);
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
}

const asyncThunks = {
    fetchAdmins: createAsyncThunk(types.FETCH_ADMINS, fetchAdmins),
    fetchAdminDetail: createAsyncThunk(types.FETCH_ADMIN_DETAIL, fetchAdminDetail),
    createAdmin: createAsyncThunk(types.CREATE_ADMIN, createAdmin),
    updateAdmin: createAsyncThunk(types.UPDATE_ADMIN, updateAdmin),
    deleteAdmin: createAsyncThunk(types.DELETE_ADMIN, deleteAdmin),
}

export default asyncThunks;