import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCategoryActions from "./useCategoryActions";


const useCategoryDetail = (id) => {
    const actions = useCategoryActions();
    const categoryDetail = useSelector(state => state.category.categoryDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearCategoryDetail();
        actions.fetchCategoryDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearCategoryDetail();
        actions.fetchCategoryDetail({ id, setLoading });
    }, [actions, id])

    return {
        categoryDetail,
        loading,
        refresh
    };
}

export default useCategoryDetail;