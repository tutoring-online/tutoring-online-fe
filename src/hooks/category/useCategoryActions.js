import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/category/asyncThunk";
import * as types from "redux/category/types";
import { actions as reduxActions } from "redux/category/slice";

const useCategoryActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchCategoryDetail: compose(dispatch, asyncThunks.fetchCategoryDetail),
        clearCategoryDetail: compose(dispatch, reduxActions[types.CLEAR_CATEGORY_DETAIL]),
        fetchCategories: compose(dispatch, asyncThunks.fetchCategories),
        createCategory: compose(dispatch, asyncThunks.createCategory),
        updateCategory: compose(dispatch, asyncThunks.updateCategory),
        deleteCategory: compose(dispatch, asyncThunks.deleteCategory),
    })

    return actions;
}

export default useCategoryActions;