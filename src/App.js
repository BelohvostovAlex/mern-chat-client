import React, { useEffect } from "react";

import { AppRouter } from "./components/AppRouter/AppRouter";
import { useStateContext } from "./context/StateContext";

export const App = () => {
  const { handleAuth, user } = useStateContext();

  useEffect(() => {
    handleAuth();
  }, [user]);

  return (
    <>
      <AppRouter />
    </>
  );
};
