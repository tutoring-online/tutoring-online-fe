import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAdminActions from "./useAdminActions";

const useAdminList = () => {
    const actions = useAdminActions();

    const adminList = useSelector(state => state.admin.admins);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchAdmins({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchAdmins({ setLoading });
    }, [actions])

    return {
        adminList,
        loading,
        refresh
    };
}

export default useAdminList;