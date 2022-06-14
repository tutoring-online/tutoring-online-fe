import { auth } from 'firebase-config/firebase';
import useAuthActions from 'hooks/useAuthActions';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import FullPageLoader from 'components/Loading/FullPageLoader';

export default function Logout() {
    const actions = useAuthActions();
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const history = useHistory();

    useEffect(() => {
        auth().signOut().then(() => {
            actions.unsubscribeUser();
        })
    }, [actions]);

    useEffect(() => {
        if (isSignedIn) return;
        const timer = setTimeout(() => {
            history.push("/auth/login");
        }, 300);

        return () => timer && clearTimeout(timer);
    }, [history, isSignedIn])

    return isSignedIn ? <FullPageLoader /> : null;
}
