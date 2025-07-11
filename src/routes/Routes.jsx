import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authsigninup/Login";
import Register from "../pages/Authsigninup/Register";
import AllDonations from "../pages/AllDonations/AllDonations";
import PrivateRoute from "./PrivateRoute";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/dashboard/user/UserProfile";
import CharityRoleRequest from "../pages/dashboard/user/RequestCharityRole";
import Favorites from "../pages/dashboard/user/Favorites";
import MyReviews from "../pages/dashboard/user/MyReviews";

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
        element: (
          <PrivateRoute>
            <AllDonations></AllDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "/donation/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  // Dashboard component 
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>,
      },
      {
        path: "my-profile",
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },
      {
        path: "request-charity-role",
        element: <PrivateRoute><CharityRoleRequest></CharityRoleRequest></PrivateRoute>
      },
      {
        path: "favorites",
        element: <PrivateRoute><Favorites></Favorites></PrivateRoute>
      },
      

    ],
  },
]);
