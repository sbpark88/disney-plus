import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

const useGoogleSignInCheck = () => {
  const [signInUser, setSignInUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const isSignOut = user === null;
      if (isSignOut) {
        signInUser !== null && setSignInUser(null);
        return navigate("/login");
      }

      const { currentUser } = auth;
      const newUser = signInUser?.uid !== currentUser?.uid;
      newUser && setSignInUser(currentUser);

      const signInPage = pathname === "/login";
      signInPage && navigate("/main");
    });
  }, [auth, pathname]);

  return signInUser;
};

export default useGoogleSignInCheck;
