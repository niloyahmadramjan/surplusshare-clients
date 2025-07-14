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
import TransactionHistory from "../pages/dashboard/user/TransactionHistory";
import RestaurantProfile from "../pages/dashboard/restaurant/RestaurantProfile";
import AddDonation from "../pages/dashboard/restaurant/AddDonation";
import MyDonations from "../pages/dashboard/restaurant/MyDonations";
import RequestedDonations from "../pages/dashboard/restaurant/RequestedDonations";
import CharityProfile from "../pages/dashboard/charity/CharityProfile";
import MyRequests from "../pages/dashboard/charity/MyRequests";
import MyPickups from "../pages/dashboard/charity/MyPickups";
import ReceivedDonations from "../pages/dashboard/charity/ReceivedDonations";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import ManageDonations from "../pages/dashboard/admin/ManageDonations";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageRoleRequests from "../pages/dashboard/admin/ManageRoleRequests";
import ManageRequests from "../pages/dashboard/admin/ManageRequests";
import FeatureDonations from "../pages/dashboard/admin/FeatureDonations";
import AdminRoute from "./AdminRoute";
import Unauthorized from "../pages/Unauthorized";

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
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      // Normal user role
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "request-charity-role",
        element: (
          <PrivateRoute>
            <CharityRoleRequest></CharityRoleRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites></Favorites>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <PrivateRoute>
            <TransactionHistory></TransactionHistory>
          </PrivateRoute>
        ),
      },
      // restaurant user role
      {
        path: "restaurant-profile",
        element: <RestaurantProfile></RestaurantProfile>,
      },
      {
        path: "add-donation",
        element: <AddDonation></AddDonation>,
      },
      {
        path: "my-donations",
        element: <MyDonations></MyDonations>,
      },
      {
        path: "requested-donations",
        element: <RequestedDonations></RequestedDonations>,
      },
      // charity user role
      {
        path: "charity-profile",
        element: <CharityProfile></CharityProfile>,
      },
      {
        path: "my-requests",
        element: <MyRequests></MyRequests>,
      },
      {
        path: "my-pickups",
        element: <MyPickups></MyPickups>,
      },
      {
        path: "received-donations",
        element: <ReceivedDonations></ReceivedDonations>,
      },
      // admin role
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <AdminRoute>
            <ManageDonations></ManageDonations>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-roles",
        element: (
          <AdminRoute>
            <ManageRoleRequests></ManageRoleRequests>
          </AdminRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <ManageRoleRequests>
            <ManageRequests></ManageRequests>
          </ManageRoleRequests>
        ),
      },
      {
        path: "feature-donations",
        element: (
          <ManageRequests>
            <FeatureDonations></FeatureDonations>
          </ManageRequests>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>,
  },
]);
