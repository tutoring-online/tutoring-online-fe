import { useEffect, useState } from "react";
import useAuthActions from "./useAuthActions";
import { auth } from "firebase-config/firebase";

const useAuthentication = () => {
    const actions = useAuthActions();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (currentUser) => {
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
        });

        return () => unregisterAuthObserver();
    }, [actions])


    return loading;
}

export default useAuthentication;