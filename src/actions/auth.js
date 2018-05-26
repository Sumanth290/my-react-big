import {firebase,googleAuthProvider} from "../firebase/firebase";

export let initialPath = "/";
export const resetInitPath = () => {
    initialPath = "/";
};

export const setInitPath = (path) => {
    initialPath = path;
    console.log("initialPath",initialPath);
};

export const login = (uid) => ({ type : "LOGIN", uid });

export const logout = () => ({ type: "LOGOUT" });

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return () => {
        resetInitPath();
        return firebase.auth().signOut();
    };
};