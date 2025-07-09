import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authsigninup/Login";
import Register from "../pages/Authsigninup/Register";
import AllDonations from "../pages/AllDonations/AllDonations";
import PrivateRoute from "./PrivateRoute";
import DonationDetails from "../pages/DonationDetails/DonationDetails";

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
        Component: Register,
      },
      {
        path: "/donations",
        element: <PrivateRoute><AllDonations></AllDonations></PrivateRoute>
      },
      {
        path: "/donation/:id",
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>

      }
    ],
  },
]);
