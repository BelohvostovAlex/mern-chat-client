import { createContext, useContext, useState } from "react";

import { getCurrentUserAuthService } from "../services/authService";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const addUser = (value) => {
    setUser(value);
  };

  const getUser = async (username) => {
    const user = await getCurrentUserAuthService("/auth/current-user", {
      username,
    });
    addUser(user);
  };

  const handleAuth = () => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  return (
    <Context.Provider value={{ isAuth, handleAuth, addUser, getUser, user }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
