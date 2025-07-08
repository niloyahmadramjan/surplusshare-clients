import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authsigninup/Login";
import Register from "../pages/Authsigninup/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
          {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register
      }
    ]
  },
]);