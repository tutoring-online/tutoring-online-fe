import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";

const fetchPayments = async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchPayments();
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchPaymentsWithFilter = async (params) => {
    const { filter, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchPayments(filter);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const fetchPaymentDetail = async (params) => {
    const { id, setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchPaymentDetail(id);
        return response;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}

const createPayment = async (params) => {
    const { data, loading = () => { }, callback = () => { } } = params;
    console.log(data);
    loading(true);
    try {
        const response = await api.createPayment(data);

        console.log(response)
        callback(true, response);
        toast.success("Booking successfully.");
        return response;
    } catch (error) {
        callback(false);
        toast.error("Booking failed.");
        throw error;
    } finally {
        loading(false);
    }
}

const updatePayment = async (params) => {
    const { id, data, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        const response = await api.updatePayment(id, data);

        callback(true, response);
        toast.success("Updated booking successfully.");
    } catch (error) {
        callback(false);
        toast.error("Failed to update the booking.");
        throw error;
    } finally {
        loading(false);
    }
}

const deletePayment = async (params) => {
    const { id, loading = () => { }, callback = () => { } } = params;
    loading(true);
    try {
        await api.deletePayment(id);

        callback(true);
        toast.success("Deleted booking successfully.");
        return null;
    } catch (error) {
        callback(false);
        toast.error("Failed to delete the booking.");
        throw error;
    } finally {
        loading(false);
    }
}

const asyncThunks = {
    fetchPayments: createAsyncThunk(types.FETCH_PAYMENTS, fetchPayments),
    fetchPaymentsWithFilter: createAsyncThunk(types.FETCH_PAYMENTS_WITH_FILTER, fetchPaymentsWithFilter),
    fetchPaymentDetail: createAsyncThunk(types.FETCH_PAYMENT_DETAIL, fetchPaymentDetail),
    createPayment: createAsyncThunk(types.CREATE_PAYMENT, createPayment),
    updatePayment: createAsyncThunk(types.UPDATE_PAYMENT, updatePayment),
    deletePayment: createAsyncThunk(types.DELETE_PAYMENT, deletePayment),
}

export default asyncThunks;