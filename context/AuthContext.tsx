import { useContext, useState, useEffect, createContext } from "react";
import firebase, { auth } from "@/lib/firebase";
import nookies from "nookies";
import Router from "next/router";


const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(name, email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((reg) => {
                const user = reg.user
                user.updateProfile({ displayName: name })
            })
            .catch((error) => console.log(error))
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function loginWithProvider(provider, redirect) {
        setLoading(true)
        return auth
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user
                setCurrentUser(user)
                setLoading(false)
                if (redirect) {
                    Router.push(redirect)
                }
            })
            .catch((error) => console.log(error))
    }

    function loginWithGoogle(redirect) {
        const provider = new firebase.auth.GoogleAuthProvider()
        return loginWithProvider(provider, redirect)
    }

    function loginWithTwitter(redirect) {
        const provider = new firebase.auth.TwitterAuthProvider()
        return loginWithProvider(provider, redirect)
    }

    function logout() {
        nookies.destroy(null, "token");
        return auth.signOut();
    }

    function passwordReset(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateUserName(name) {
        return currentUser.updateProfile({ displayName: name })
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                setLoading(false);
                nookies.destroy(null, "token");
                nookies.set(null, "token", "", { path: "/", sameSite: "none" });
                return;
            }
            const token = await user.getIdToken();
            setCurrentUser(user);
            setLoading(false);
            nookies.destroy(null, "token");
            nookies.set(null, "token", token, { path: "/" , sameSite: "none", secure: true });
        });
        return unsubscribe;
    }, []);

    const pass = {
        currentUser,
        login,
        loginWithGoogle,
        loginWithTwitter,
        signup,
        logout,
        passwordReset,
        updateUserName,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={pass}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
