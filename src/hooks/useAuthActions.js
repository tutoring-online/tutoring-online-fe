import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { actions } from "redux/auth/slice";
import { UNSUBSCRIBE_USER, SUBSCRIBE_USER } from "redux/auth/types";

const useAuthActions = () => {
    const dispatch = useDispatch();
    const [authActions] = useState({
        subscribeUser: compose(dispatch, actions[SUBSCRIBE_USER]),
        unsubscribeUser: compose(dispatch, actions[UNSUBSCRIBE_USER]),
    })

    return authActions;
}

export default useAuthActions;