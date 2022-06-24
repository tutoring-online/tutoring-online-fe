import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/category/asyncThunk";

const useCategoryActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchCategories: compose(dispatch, asyncThunks.fetchCategories),
        fetchCategoryDetail: compose(dispatch, asyncThunks.fetchCategoryDetail),
        createCategory: compose(dispatch, asyncThunks.createCategory),
        updateCategory: compose(dispatch, asyncThunks.updateCategory),
        deleteCategory: compose(dispatch, asyncThunks.deleteCategory),
    })

    return actions;
}

export default useCategoryActions;