import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/authService";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // ✅ Create account
  const signUpUserWithEmailPass = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in
  const handleSignInEmailPass = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ✅ Google Login Popup
const handleGoogleLogin = () => {
  setLoader(true);
  return signInWithPopup(auth, googleProvider);
};

// ✅ GitHub Login Popup
const handleGithubLogin = () => {
  setLoader(true);
  return signInWithPopup(auth, githubProvider);
};


  // update user profile 
  const updateUserProfile = (name,imgURL)=>{
    return updateProfile(auth.currentUser, {
  displayName: name, photoURL: imgURL
})
  }

  // ✅ Logout
  const handleLogOut = () => {
    setLoader(true);
    return signOut(auth).then(() => {
      setLoader(false);
    });
  };

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => unsubscribe();
  }, []);
  const authinfo = {
    user,
    loader,
    setLoader,
    signUpUserWithEmailPass,
    updateUserProfile,
    handleGoogleLogin,
    handleGithubLogin,
    handleSignInEmailPass,
    handleLogOut,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
