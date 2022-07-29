import { keyPair } from "firebase-config/firebase";
import { messaging } from "firebase-config/firebase";
import { useEffect } from "react";

const useSubscribeUser = () => {

    useEffect(() => {
        messaging.getToken({ vapidKey: keyPair })
            .then(token => {
                console.log(token);
            }).catch(e => {
                console.log(e);
            })
    }, [])
}

export default useSubscribeUser;