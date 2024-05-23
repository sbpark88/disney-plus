import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const googleSignIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const signInSuccess = (userCredential: any) => {
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;
    const user = userCredential.user;
  };

  const signInFailure = (error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(errorMessage);
  };

  try {
    const userCredential = await signInWithPopup(auth, provider);
    signInSuccess(userCredential);
  } catch (error) {
    signInFailure(error);
  }
};

export const googleSignOut = async () => {
  const auth = getAuth();

  const signOutSuccess = () => {};

  const signOutFailure = (error: any) => {};

  try {
    await signOut(auth);
    signOutSuccess();
  } catch (error) {
    signOutFailure(error);
  }
};
