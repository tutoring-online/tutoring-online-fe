import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/admin/asyncThunk";

const useAdminActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchAdmins: compose(dispatch, asyncThunks.fetchAdmins),
        fetchAdminDetail: compose(dispatch, asyncThunks.fetchAdminDetail),
        createAdmin: compose(dispatch, asyncThunks.createAdmin),
        updateAdmin: compose(dispatch, asyncThunks.updateAdmin),
        deleteAdmin: compose(dispatch, asyncThunks.deleteAdmin),
    })

    return actions;
}

export default useAdminActions;