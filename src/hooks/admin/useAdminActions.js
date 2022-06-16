import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/admin/asyncThunk";

const useAdminActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchAdmins: compose(dispatch, asyncThunks.fetchAdmins)
    })

    return actions;
}

export default useAdminActions;