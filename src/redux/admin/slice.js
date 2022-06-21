import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";


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
        state.adminDetail = action.payload || null
    },
    fetchAdminDetailFailed: (state) => {
        state.adminDetail = null
    },

    createAdminSuccessful: () => {},
    createAdminFailed: () => {},

    updateAdminSuccessful: (state, action) => {
        state.adminDetail = action.payload
    },
    updateAdminFailed: () => {},

    deleteAdminSuccessful: () => {},
    deleteAdminFailed: () => {},
}

const slice = createSlice({
    name: "adminReducer",
    initialState: INITIAL_STATE,
    reducers: {

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