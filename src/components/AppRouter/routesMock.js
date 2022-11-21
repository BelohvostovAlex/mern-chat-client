import { Main } from "../../pages/Main/Main";
import { Login } from "../../pages/Login/Login";

export const routesPathes = {
  login: "/login",
  main: "/",
};

export const privateRoutes = [{ path: routesPathes.main, element: Main }];
export const publicRoutes = [{ path: routesPathes.login, element: Login }];
