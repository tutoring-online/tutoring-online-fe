import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";
import { ROLES } from "settings/setting.js";

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
    const { data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const createAdminData = { ...data, role: ROLES.admin };
        const response = await api.createAdmin(createAdminData);

        console.log(response)
        callback(true, response);
        toast.success("Create admin successful.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Create admin failed.");
        throw error;
    } finally {
        loading(false);
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