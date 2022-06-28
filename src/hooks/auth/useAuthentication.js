import { useEffect, useState } from "react";
import useAuthActions from "./useAuthActions";
import { auth } from "firebase-config/firebase";
import { toast } from "react-toastify";
import { equalIgnoreCase } from "helpers/stringUtils";
import { useHistory } from "react-router-dom";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";

const FIREBASE_NETWORK_ERROR = "auth/network-request-failed";

const useAuthentication = () => {
    const actions = useAuthActions();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (currentUser) => {
            try {
                if (!currentUser) {
                    actions.unsubscribeUser();
                    return;
                }

                const token = await currentUser.getIdToken();
                console.log(token);

                setLoading(true);
                await actions.asyncLoginUser({ token });
            } catch (error) {
                if (equalIgnoreCase(error?.code, FIREBASE_NETWORK_ERROR)) {
                    toast.error("Network error!")
                    return;
                }
                console.log(error);
            } finally {
                setLoading(false);
                history.push(getFullPath(ROUTES.login))
            }
        });

        return () => unregisterAuthObserver();
    }, [actions, history])


    return loading;
}

export default useAuthentication;