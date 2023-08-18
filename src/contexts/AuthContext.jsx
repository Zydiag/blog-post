import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  deleteUser,
} from 'firebase/auth';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  function signUp(name, email, password) {
    const userCredentials = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function verifyEmail() {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email sent.
      
    })
  }
  function removeUser() {
    return deleteUser(auth.currentUser);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(currentUser);
      setCurrentUser(user);
      setCurrentUser(() => user);
    });
    // console.log(currentUser);
    return () => unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logout,
    googleSignIn,
    verifyEmail,
    removeUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
