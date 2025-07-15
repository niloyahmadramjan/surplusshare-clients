import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaUserShield,
  FaHandsHelping,
  FaHeart,
  FaClipboardList,
  FaHistory,
  FaStar,
  FaSignOutAlt,
  FaBars,
  FaPlusCircle,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import FoodAnimation from "../pages/LoadingAnimation/FoodLoading";

const DashboardLayout = () => {
  const { user, handleLogOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleUserLogOut = () => {
    navigate("/");
    handleLogOut();
  };

  if (isLoading) return <FoodAnimation />;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to fetch user data.</p>
    );

  const role = userData?.role || "user";

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <Link
              to="admin-profile"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaUserShield /> Admin Profile
            </Link>
            <Link
              to="manage-donations"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> Manage Donations
            </Link>
            <Link
              to="manage-users"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaUser /> Manage Users
            </Link>
            <Link
              to="manage-roles"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> Manage Role Requests
            </Link>
            <Link
              to="manage-requests"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> Manage Requests
            </Link>
            <Link
              to="feature-donations"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaStar /> Feature Donations
            </Link>
          </>
        );
      case "restaurant":
        return (
          <>
            <Link
              to="restaurant-profile"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaUserShield /> Restaurant Profile
            </Link>
            <Link
              to="add-donation"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaPlusCircle /> Add Donation
            </Link>
            <Link
              to="my-donations"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> My Donations
            </Link>
            <Link
              to="requested-donations"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> Requested Donations
            </Link>
          </>
        );
      case "charity":
        return (
          <>
            <Link
              to="charity-profile"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaUser /> Charity Profile
            </Link>
            <Link
              to="my-requests"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> My Requests
            </Link>
            <Link
              to="my-pickups"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> My Pickups
            </Link>
            <Link
              to="received-donations"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaHeart /> Received Donations
            </Link>
            <Link
              to="transactions-history"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaHistory /> Transaction History
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link
              to="my-profile"
              className="btn btn-ghost justify-start "
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaUser /> My Profile
            </Link>
            <Link
              to="request-charity-role"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaHandsHelping /> Request Charity Role
            </Link>
            <Link
              to="favorites"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaHeart /> Favorites
            </Link>
            <Link
              to="my-reviews"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaClipboardList /> My Reviews
            </Link>
            <Link
              to="transactions-history"
              className="btn btn-ghost justify-start"
              onClick={() =>
                (document.getElementById("mobile-drawer").checked = false)
              }
            >
              <FaHistory /> Transaction History
            </Link>
          </>
        );
    }
  };

  return (
    <div className="drawer drawer-start lg:drawer-open">
  <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

  {/* Main content area */}
  <div className="drawer-content flex flex-col w-full h-screen">
    {/* Mobile navbar (only visible on small screen) */}
    <div className="fixed top-0 left-0 right-0 z-40 bg-base-100/80 backdrop-blur-md shadow-md px-4 flex items-center justify-between h-16 lg:hidden">
      <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
        <FaBars className="text-xl" />
      </label>
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="font-medium text-sm truncate max-w-[100px]">
          {user?.displayName || "User"}
        </span>
        <img
          src={user?.photoURL}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>

    {/* Main dashboard content here */}
    <div className="mt-20 md:mt-0 p-2 overflow-y-auto">
      <Outlet></Outlet>
    </div>
  </div>

  {/* Sidebar / Drawer content */}
  <div className="drawer-side z-50">
    <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
    <div className="menu p-4 w-64 min-h-full bg-base-200">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      {renderLinks()}
      <Link to="/" className="btn btn-ghost justify-start">
        <FaHome /> Home
      </Link>
      <button
        onClick={() => {
          handleUserLogOut();
          document.getElementById("mobile-drawer").checked = false;
        }}
        className="btn btn-ghost justify-start"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  </div>
</div>

  );
};

export default DashboardLayout;
