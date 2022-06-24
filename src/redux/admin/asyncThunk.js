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
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchAdminDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchAdminDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
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
        toast.success("Created admin successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Failed to create admin.");
        throw error;
    } finally {
        loading(false);
    }
}

const updateAdmin = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateAdmin(id, data);

        callback(true, response);
        toast.success("Updated admin successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Failed to update the admin.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteAdmin = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteAdmin(id);

        callback(true);
        toast.success("Deleted admin successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the admin.");
        throw error;
    } finally {
        loading(false);
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