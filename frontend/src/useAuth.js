import React, { useContext, createContext } from "react";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const signin = () => {
    localStorage.setItem("isAuth", "authenticated");
  };
  const signout = () => {
    localStorage.removeItem("isAuth");
  };
  const isAuth = () => {
    return localStorage.getItem("isAuth");
  };

  return {
    isAuth,
    signin,
    signout,
  };
}
