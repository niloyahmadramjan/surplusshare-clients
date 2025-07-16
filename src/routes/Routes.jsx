import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Authsigninup/Login";
import Register from "../pages/Authsigninup/Register";
import AllDonations from "../pages/AllDonations/AllDonations";
import DonationDetails from "../pages/DonationDetails/DonationDetails";

// Dashboard Pages - Shared
import DashboardHome from "../pages/dashboard/DashboardHome";

// User Pages
import UserProfile from "../pages/dashboard/user/UserProfile";
import CharityRoleRequest from "../pages/dashboard/user/RequestCharityRole";
import Favorites from "../pages/dashboard/user/Favorites";
import MyReviews from "../pages/dashboard/user/MyReviews";
import TransactionHistory from "../pages/dashboard/user/TransactionHistory";

// Restaurant Pages
import RestaurantProfile from "../pages/dashboard/restaurant/RestaurantProfile";
import AddDonation from "../pages/dashboard/restaurant/AddDonation";
import MyDonations from "../pages/dashboard/restaurant/MyDonations";
import RequestedDonations from "../pages/dashboard/restaurant/RequestedDonations";

// Charity Pages
import CharityProfile from "../pages/dashboard/charity/CharityProfile";
import MyRequests from "../pages/dashboard/charity/MyRequests";
import MyPickups from "../pages/dashboard/charity/MyPickups";
import ReceivedDonations from "../pages/dashboard/charity/ReceivedDonations";

// Admin Pages
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import ManageDonations from "../pages/dashboard/admin/ManageDonations";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageRoleRequests from "../pages/dashboard/admin/ManageRoleRequests";
import ManageRequests from "../pages/dashboard/admin/ManageRequests";
import FeatureDonations from "../pages/dashboard/admin/FeatureDonations";

// Routes and protection
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CharityRoute from "./CharityRoute";
import RestaurantRoute from "./restaurantRoute";

// Unauthorized Page
import Unauthorized from "../pages/Unauthorized";
import LogOut from "../pages/Authsigninup/LogOut";

// Route Configuration
export const router = createBrowserRouter([
  // =======================
  // Public Routes (MainLayout)
  // =======================
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home }, // Home Page
      { path: "login", Component: Login }, // Login Page
      { path: "register", Component: Register }, // Register Page

      // Protected: All Donations
      {
        path: "donations",
        element: (
          <PrivateRoute>
            <AllDonations />
          </PrivateRoute>
        ),
      },

      // Protected: Donation Details by ID
      {
        path: "donation/:id",
        element: (
          <CharityRoute>
            <DonationDetails />
          </CharityRoute>
        ),
      },
    ],
  },

  // =======================
  // Dashboard Routes (DashboardLayout)
  // =======================
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // Dashboard Home (Protected)
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },

      // ===== Normal User Routes =====
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "request-charity-role",
        element: (
          <PrivateRoute>
            <CharityRoleRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        ),
      },

      // ===== Restaurant Routes =====
      {
        path: "restaurant-profile",
        element: (
          <RestaurantRoute>
            <RestaurantProfile />
          </RestaurantRoute>
        ),
      },
      {
        path: "add-donation",
        element: (
          <RestaurantRoute>
            <AddDonation />
          </RestaurantRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <RestaurantRoute>
            <MyDonations />
          </RestaurantRoute>
        ),
      },
      {
        path: "requested-donations",
        element: (
          <RestaurantRoute>
            <RequestedDonations />
          </RestaurantRoute>
        ),
      },

      // ===== Charity Routes =====
      {
        path: "charity-profile",
        element: (
          <CharityRoute>
            <CharityProfile />
          </CharityRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <CharityRoute>
            <MyRequests />
          </CharityRoute>
        ),
      },
      {
        path: "my-pickups",
        element: (
          <CharityRoute>
            <MyPickups />
          </CharityRoute>
        ),
      },
      {
        path: "received-donations",
        element: (
          <CharityRoute>
            <ReceivedDonations />
          </CharityRoute>
        ),
      },

      // ===== Admin Routes =====
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <AdminRoute>
            <ManageDonations />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-roles",
        element: (
          <AdminRoute>
            <ManageRoleRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests />
          </AdminRoute>
        ),
      },
      {
        path: "feature-donations",
        element: (
          <AdminRoute>
            <FeatureDonations />
          </AdminRoute>
        ),
      },
    ],
  },

  // =======================
  // Unauthorized Route
  // =======================
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>
  }
]);
