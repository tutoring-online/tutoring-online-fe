import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAdminActions from "./useAdminActions";


const useAdminDetail = (id) => {
    const actions = useAdminActions();
    const adminDetail = useSelector(state => state.admin.adminDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearAdminDetail();
        actions.fetchAdminDetail({ id, setLoading });
    }, [actions, id]);

    return {
        adminDetail,
        loading
    };
}

export default useAdminDetail;