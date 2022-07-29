import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCategoryActions from "./useCategoryActions";

const useCategoryList = () => {
    const actions = useCategoryActions();

    const categoryList = useSelector(state => state.category.categories);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchCategories({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchCategories({ setLoading });
    }, [actions])

    return {
        categoryList,
        loading,
        refresh
    };
}

export default useCategoryList;