import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase.init';

const AuthProvider = ({ children }) => {

    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState(null)

    const provider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleAuth = () => {
        setLoader(true);
        return signInWithPopup(auth, provider)
    }

    const userProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const forgetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const info = {
        user,
        loader,
        setLoader,
        createUser,
        userProfile,
        logOut,
        signIn,
        googleAuth,
        forgetPass
    };

    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;