import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/admin/asyncThunk";

const useAuthActions = () => {
    const dispatch = useDispatch();
    const [authActions] = useState({
        fetchAdmins: compose(dispatch, asyncThunks.fetchAdmins)
    })

    return authActions;
}

export default useAuthActions;