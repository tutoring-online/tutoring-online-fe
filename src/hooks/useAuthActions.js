import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { actions } from "redux/auth/slice";
import * as types from "redux/auth/types";

const useAuthActions = () => {
    const dispatch = useDispatch();
    const [authActions] = useState({
        subscribeUser: compose(dispatch, actions[types.SUBSCRIBE_USER]),
        unsubscribeUser: compose(dispatch, actions[types.UNSUBSCRIBE_USER]),
    })

    return authActions;
}

export default useAuthActions;