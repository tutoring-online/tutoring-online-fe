import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchCategories = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchCategories();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchCategoryDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchCategoryDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const createCategory = async (params) => {
    const { data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.createCategory(data);

        console.log(response)
        callback(true, response);
        toast.success("Created category successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Failed to create category.");
        throw error;
    } finally {
        loading(false);
    }
}

const updateCategory = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updateCategory(id, data);

        callback(true, response);
        toast.success("Updated category successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the category.");
        throw error;
    } finally {
        loading(false);
    }
}

const deleteCategory = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deleteCategory(id);

        callback(true);
        toast.success("Deleted category successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the category.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchCategories: createAsyncThunk(types.FETCH_CATEGORIES, fetchCategories),
    fetchCategoryDetail: createAsyncThunk(types.FETCH_CATEGORY_DETAIL, fetchCategoryDetail),
    createCategory: createAsyncThunk(types.CREATE_CATEGORY, createCategory),
    updateCategory: createAsyncThunk(types.UPDATE_CATEGORY, updateCategory),
    deleteCategory: createAsyncThunk(types.DELETE_CATEGORY, deleteCategory),
}

export default asyncThunks;