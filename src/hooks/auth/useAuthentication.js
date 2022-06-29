import { useEffect, useState } from "react";
import useAuthActions from "./useAuthActions";
import { auth } from "firebase-config/firebase";
import { toast } from "react-toastify";
import { equalIgnoreCase } from "helpers/stringUtils";
import { ROLES } from "settings/setting";
import { useHistory } from "react-router-dom";

const FIREBASE_NETWORK_ERROR = "auth/network-request-failed";
const NETWORK_ERROR = "Network Error";

const useAuthentication = () => {
    const actions = useAuthActions();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                actions.unsubscribeUser();
                return;
            }

            const token = await currentUser.getIdToken();
            console.log(token);

            let hasError = false;

            try {
                setLoading(true);
                await actions.asyncLoginUser({ token, role: ROLES.ADMIN });
            } catch (error) {
                hasError = true;
                actions.unsubscribeUser();

                if (equalIgnoreCase(error?.code, FIREBASE_NETWORK_ERROR)) {
                    toast.error("Network error!")
                    return;
                }
                
                if (equalIgnoreCase(error?.message, NETWORK_ERROR)) {
                    toast.error("Network error!")
                    return;
                }
                
                toast.error("Login failed.");
                await auth().signOut();
            } finally {
                setLoading(false);
                hasError && history.push("auth/login");
            }
        });

        return () => unregisterAuthObserver();
    }, [actions, history])


    return loading;
}

export default useAuthentication;