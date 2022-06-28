import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";
import * as types from "./types";

const INITIAL_STATE = {
    categories: [],
    categoryDetail: [],
}

const reducers = {
    fetchCategoriesSuccessful: (state, action) => {
        state.categories = action.payload;
    },
    fetchCategoriesFailed: (state) => {
        state.categories = [];
    },

    fetchCategoryDetailSuccessful: (state, action) => {
        state.categoryDetail = isAvailableArray(action.payload) ? action.payload[0] : null;
    },
    fetchCategoryDetailFailed: (state) => {
        state.categoryDetail = null
    },

    createCategorySuccessful: () => { },
    createCategoryFailed: () => { },

    updateCategorySuccessful: (state, action) => {
        state.categoryDetail = action.payload
    },
    updateCategoryFailed: () => { },

    deleteCategorySuccessful: () => { },
    deleteCategoryFailed: () => { },
}

const slice = createSlice({
    name: "categoryReducer",
    initialState: INITIAL_STATE,
    reducers: {
        [types.CLEAR_CATEGORY_DETAIL]: (state) => {
            state.categoryDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchCategories.fulfilled, reducers.fetchCategoriesSuccessful);
        builder.addCase(asyncThunks.fetchCategories.rejected, reducers.fetchCategoriesFailed);

        builder.addCase(asyncThunks.fetchCategoryDetail.fulfilled, reducers.fetchCategoryDetailSuccessful);
        builder.addCase(asyncThunks.fetchCategoryDetail.rejected, reducers.fetchCategoryDetailFailed);

        builder.addCase(asyncThunks.createCategory.fulfilled, reducers.createCategorySuccessful);
        builder.addCase(asyncThunks.createCategory.rejected, reducers.createCategoryFailed);

        builder.addCase(asyncThunks.updateCategory.fulfilled, reducers.updateCategorySuccessful);
        builder.addCase(asyncThunks.updateCategory.rejected, reducers.updateCategoryFailed);

        builder.addCase(asyncThunks.deleteCategory.fulfilled, reducers.deleteCategorySuccessful);
        builder.addCase(asyncThunks.deleteCategory.rejected, reducers.deleteCategoryFailed);
    }
})

export const categoryReducer = slice.reducer;
export const actions = slice.actions;

export default slice;