import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';

export const keyPair = "BFBZZug0kR_HiFaADJK7ei0qvccGiQd1MHBC1u76Vps2HZXYpXJCAqtX9tPwtTa9K-Memu1VsFaiO9nIwQiGn-s";

export const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = firebase.initializeApp(config);
firebase.auth(app);

export const auth = firebase.auth;
export default app;

export const messaging = firebase.messaging();

export const getFirebaseToken = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) return currentUser.getIdToken();

    const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
    if (!hasRememberedAccount) return null;

    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
        }, 2000);

        const unregisterAuthObserver = auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null);
            }

            const token = await user.getIdToken();
            console.log('[AXIOS] Logged in user token: ', token);
            resolve(token);

            unregisterAuthObserver();
            clearTimeout(waitTimer);
        });
    });
}