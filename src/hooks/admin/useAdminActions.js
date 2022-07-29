import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/admin/asyncThunk";
import * as types from "redux/admin/types";
import { actions as reduxActions } from "redux/admin/slice";

const useAdminActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchAdminDetail: compose(dispatch, asyncThunks.fetchAdminDetail),
        clearAdminDetail: compose(dispatch, reduxActions[types.CLEAR_ADMIN_DETAIL]),
        fetchAdmins: compose(dispatch, asyncThunks.fetchAdmins),
        createAdmin: compose(dispatch, asyncThunks.createAdmin),
        updateAdmin: compose(dispatch, asyncThunks.updateAdmin),
        deleteAdmin: compose(dispatch, asyncThunks.deleteAdmin),
    })

    return actions;
}

export default useAdminActions;