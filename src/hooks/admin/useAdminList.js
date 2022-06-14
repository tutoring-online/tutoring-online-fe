import { useEffect } from "react";
import { useSelector } from "react-redux";
import useAdminActions from "./useAdminActions";

const useAdminList = () => {
    const adminList = useSelector(state => state.admin.admins);
    const actions = useAdminActions();

    useEffect(() => {
        actions.fetchAdmins();
    }, [actions])
    
    return adminList;
}

export default useAdminList;