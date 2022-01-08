import React, { useState, useContext, createContext } from "react";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  console.log(auth);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [auth, setAuth] = useState(false);

  const signin = () => {
    setAuth(true);
  };
  const signout = () => {
    setAuth(false);
  };

  return {
    auth,
    signin,
    signout,
  };
}
