import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    admins: [],
    adminDetail: null,
}

const reducers = {
    fetchAdminsSuccessful: (state, action) => {
        state.admins = action.payload;
    },
    fetchAdminsFailed: (state) => {
        state.admins = [];
    },

    fetchAdminDetailSuccessful: (state, action) => {
        state.adminDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchAdminDetailFailed: (state) => {
        state.adminDetail = null
    },

    createAdminSuccessful: (state, action) => {
        console.log(state, action);
    },
    createAdminFailed: (state, action) => {
        console.log(state, action);
    },

    updateAdminSuccessful: (state, action) => {
        console.log(state, action);
    },
    updateAdminFailed: (state, action) => {
        console.log(state, action);
    },

    deleteAdminSuccessful: (state, action) => {
        console.log(state, action);
    },
    deleteAdminFailed: (state, action) => {
        console.log(state, action);
    },
}

const slice = createSlice({
    name: "adminReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_ADMIN_DETAIL]: (state) => {
            state.adminDetail = null;
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchAdmins.fulfilled, reducers.fetchAdminsSuccessful);
        builder.addCase(asyncThunks.fetchAdmins.rejected, reducers.fetchAdminsFailed);

        builder.addCase(asyncThunks.fetchAdminDetail.fulfilled, reducers.fetchAdminDetailSuccessful);
        builder.addCase(asyncThunks.fetchAdminDetail.rejected, reducers.fetchAdminDetailFailed);

        builder.addCase(asyncThunks.createAdmin.fulfilled, reducers.createAdminSuccessful);
        builder.addCase(asyncThunks.createAdmin.rejected, reducers.createAdminFailed);

        builder.addCase(asyncThunks.updateAdmin.fulfilled, reducers.updateAdminSuccessful);
        builder.addCase(asyncThunks.updateAdmin.rejected, reducers.updateAdminFailed);

        builder.addCase(asyncThunks.deleteAdmin.fulfilled, reducers.deleteAdminSuccessful);
        builder.addCase(asyncThunks.deleteAdmin.rejected, reducers.deleteAdminFailed);
    }
})

export const adminReducer = slice.reducer;
export const actions = slice.actions;

export default slice;