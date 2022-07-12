import { useEffect, useState } from "react";
import useAuthActions from "./useAuthActions";
import { auth } from "firebase-config/firebase";
import { toast } from "react-toastify";
import { equalIgnoreCase } from "helpers/stringUtils";
import { useHistory } from "react-router-dom";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import { ROLES } from "settings/setting";

const FIREBASE_NETWORK_ERROR = "auth/network-request-failed";
const NETWORK_ERROR = "Network Error";

const useAuthentication = () => {
    const actions = useAuthActions();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (currentUser) => {

            const location = history.location?.pathname;
            if (!currentUser) {
                actions.unsubscribeUser();
                return;
            }

            const token = await currentUser.getIdToken();
            console.log(token);

            let hasError = false;

            try {
                setLoading(true);
                if (location === getFullPath(ROUTES.login)) {
                    await actions.asyncLoginUser({ token });
                } else if (location === getFullPath(ROUTES.signup)) {
                    await actions.asyncSignupUser({ token, role: ROLES.STUDENT });
                }
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

                if (location === getFullPath(ROUTES.login)) {
                    toast.error("Login failed.");
                }

                if (location === getFullPath(ROUTES.signup)) {
                    toast.error("Signup failed.");
                }
                await auth().signOut();
            } finally {
                setLoading(false);
                if (hasError) {
                    if (location === getFullPath(ROUTES.login)) {
                        history.push("auth/login");
                    }

                    if (location === getFullPath(ROUTES.signup)) {
                        history.push("auth/signup");
                    }
                } else {
                    history.push("/auth/redirect-home");
                }

            }
        });

        return () => unregisterAuthObserver();
    }, [actions, history])


    return loading;
}

export default useAuthentication;