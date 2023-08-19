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
    const res = signInWithEmailAndPassword(auth, email, password);
    // setCurrentUser()
    return res;
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
    });
  }
  function removeUser() {
    return deleteUser(auth.currentUser);
  }

  function reload() {
    auth.currentUser.reload();
  }
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user); 
      console.log('user changed'); 
      setCurrentUser((prevUser) => {
        // Update the state based on the previous state
        if (user && !prevUser.uid) {
          // Handle user login
          console.log('User logged in:', user.email);
          return user;
        } else if (!user && prevUser.uid) {
          // Handle user logout
          console.log('User logged out');
          return {};
        }

        // No change needed
        return prevUser;
      });
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logout,
    googleSignIn,
    verifyEmail,
    removeUser,
    reload,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
