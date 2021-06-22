// React
import React, { useState, useEffect, useContext, createContext } from 'react';

// FirebaseConfig
import firebase from '../firebase';

// DataBank
import { useFirestore } from '../service/use-firestore';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const firestore = useFirestore();

  // fired with loginWithGoogle button in LoginPage -->OK
  const signInWithGooglePopup = async (cb) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(async (response) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = response.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const signedUser = response.user;
        // ...
        setUser(signedUser);
        const userRecord = {
          displayName: signedUser.displayName,
          email: signedUser.email,
          photoUrl: signedUser.photoURL,
          phone: signedUser.phoneNumber,
          addresses: [],
        };
        await firestore.postNewUser(signedUser.uid, userRecord);
        cb();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        return Promise.reject(error);
      });
  };

  // fired with login button in LoginPage --->OK
  const signInWithEmailAndPassword = async (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  // fired with register button in RegisterPage -->OK
  const signUp = async (email, password, username, address, phoneNumber) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const signedUser = response.user;
        signedUser.sendEmailVerification().catch((error) => {
          console.log(error);
        });
        setUser(signedUser);
        const userRecord = {
          displayName: signedUser.displayName,
          email: signedUser.email,
          photoUrl: signedUser.photoURL,
          addresses: [],
          phone: signedUser.phoneNumber,
        };
        if (username) {
          try {
            await signedUser.updateProfile({
              displayName: username,
            });
            userRecord.displayName = signedUser.displayName;
          } catch (error) {
            console.log(error);
          }
        }
        if (phoneNumber) {
          try {
            await signedUser.updatePhoneNumber(phoneNumber);
            userRecord.phone = phoneNumber;
          } catch (error) {
            console.log(error);
          }
        }
        if (address) {
          try {
            userRecord.addresses = [address];
          } catch (error) {
            console.log(error);
          }
        }
        await firestore.postNewUser(signedUser.uid, userRecord);
      })
      .catch((error) => {
        const { code: errorCode, message: errorMessage } = error;
        if (errorCode == 'auth/weak-password') {
          return Promise.reject(error);
        } else {
          console.log(error);
        }
      });
  };

  // need to be tested
  const signInAnonymously = async (cd) => {
    return firebase
      .auth()
      .signInAnonymously()
      .then((response) => {
        setUser(response.user);
        cd();
        return response.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  // fired with signout button in SettingButton -->OK
  const signOut = async (cb) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        cb();
      });
  };

  // fired with UserProfilePage -->Reviewed with error 103
  const updateUserName = async (uid, userName) => {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: userName,
        // we can update the photoURL too
      })
      .then(async () => {
        setUser(firebase.auth().currentUser);
        await firestore.updateUserByUid(uid, { displayName: userName });
      })
      .catch((error) => {
        // An error happened.
        console.log(error.code);
        console.log(error.message);
      });
  };

  // fired with handleUpdateEmail in UserProfilePage -->OK
  const updateUserEmail = async (userEmail) => {
    return firebase
      .auth()
      .currentUser.updateEmail(userEmail)
      .then(async () => {
        try {
          await firebase.auth().currentUser.sendEmailVerification();
          setUser(firebase.auth().currentUser);
        } catch (error) {
          Promise.reject(error);
        }
      });
  };

  // fired with UserProfilePage or LoginPage-->OK
  const sendPasswordResetEmail = async (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return Promise.resolve({
          code: 'auth/e-mail-sent',
          message:
            'We sent you a e-mail to reset your password, check your mailbox.',
        });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  // fired with -->review
  const confirmPasswordReset = async (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signInWithGooglePopup,
    signInWithEmailAndPassword,
    signUp,
    signOut,
    updateUserName,
    updateUserEmail,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
