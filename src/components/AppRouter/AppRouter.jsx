import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useStateContext } from "../../context/StateContext";
import { privateRoutes, publicRoutes } from "./routesMock";

export const AppRouter = () => {
  const { isAuth } = useStateContext();

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
