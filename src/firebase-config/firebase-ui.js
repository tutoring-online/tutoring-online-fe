import { auth } from "./firebase.js";

const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: '/admin/user-profile',
    signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID,
        // auth.FacebookAuthProvider.PROVIDER_ID,
        // auth.TwitterAuthProvider.PROVIDER_ID,
        // auth.GithubAuthProvider.PROVIDER_ID,
        // auth.EmailAuthProvider.PROVIDER_ID,
        // auth.PhoneAuthProvider.PROVIDER_ID,
    ],
};

export default uiConfig;