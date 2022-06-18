import { useEffect, useState } from "react";
import useAuthActions from "./useAuthActions";
import { auth } from "firebase-config/firebase";
import { toast } from "react-toastify";
import { equalIgnoreCase } from "helpers/stringUtils";

const FIREBASE_NETWORK_ERROR = "auth/network-request-failed";

const useAuthentication = () => {
    const actions = useAuthActions();
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
                const response = await actions.asyncLoginUser({ token });

                console.log(response);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (equalIgnoreCase(error?.code, FIREBASE_NETWORK_ERROR)) {
                    toast.error("Network error!")
                } else {
                    console.log(error);
                }
            }
        });

        return () => unregisterAuthObserver();
    }, [actions])


    return loading;
}

export default useAuthentication;