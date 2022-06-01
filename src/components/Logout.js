import { auth } from 'firebase-config/firebase';
import useAuthActions from 'hooks/useAuthActions';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

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
        if (!isSignedIn) {
            history.push("/auth/login");
        }
    }, [history, isSignedIn])

    return <div>Loading...</div>
}
