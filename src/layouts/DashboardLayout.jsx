import React from "react";
import { Link, Outlet } from "react-router";
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
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user, handleLogOut } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  if (isLoading)
    return <span className="loading loading-spinner text-error"></span>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to fetch user data.</p>
    );

  const role = userData?.role || "user"; // Default to "user"

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <Link to="admin-profile" className="btn btn-ghost justify-start">
              <FaUserShield /> Admin Profile
            </Link>
            <Link to="manage-donations" className="btn btn-ghost justify-start">
              <FaClipboardList /> Manage Donations
            </Link>
            <Link to="manage-users" className="btn btn-ghost justify-start">
              <FaUser /> Manage Users
            </Link>
            <Link to="manage-roles" className="btn btn-ghost justify-start">
              <FaClipboardList /> Manage Role Requests
            </Link>
            <Link to="manage-requests" className="btn btn-ghost justify-start">
              <FaClipboardList /> Manage Requests
            </Link>
            <Link
              to="feature-donations"
              className="btn btn-ghost justify-start"
            >
              <FaStar /> Feature Donations
            </Link>
          </>
        );
      case "charity":
        return (
          <>
            <Link to="charity-profile" className="btn btn-ghost justify-start">
              <FaUser /> Charity Profile
            </Link>
            <Link to="my-requests" className="btn btn-ghost justify-start">
              <FaClipboardList /> My Requests
            </Link>
            <Link to="my-pickups" className="btn btn-ghost justify-start">
              <FaClipboardList /> My Pickups
            </Link>
            <Link
              to="received-donations"
              className="btn btn-ghost justify-start"
            >
              <FaHeart /> Received Donations
            </Link>
            <Link
              to="charity-transactions"
              className="btn btn-ghost justify-start"
            >
              <FaHistory /> Transaction History
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link to="my-profile" className="btn btn-ghost justify-start">
              <FaUser /> My Profile
            </Link>
            <Link
              to="request-charity-role"
              className="btn btn-ghost justify-start"
            >
              <FaHandsHelping /> Request Charity Role
            </Link>
            <Link to="favorites" className="btn btn-ghost justify-start">
              <FaHeart /> Favorites
            </Link>
            <Link to="my-reviews" className="btn btn-ghost justify-start">
              <FaClipboardList /> My Reviews
            </Link>
            <Link
              to="user-transactions"
              className="btn btn-ghost justify-start"
            >
              <FaHistory /> Transaction History
            </Link>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-full bg-base-200 p-4 shadow z-30">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {renderLinks()}
        <Link to="/" className="btn btn-ghost justify-start">
          <FaHome /> Home
        </Link>
        <button
          onClick={() => handleLogOut()}
          className="btn btn-ghost justify-start"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navbar for mobile */}
        <div className="navbar bg-base-100 sticky top-0 z-40 lg:hidden shadow px-4 justify-between">
          <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
            <FaBars className="text-xl" />
          </label>
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || "https://i.ibb.co/2nFsnj6/default.png"}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-sm">
              {user?.displayName || "User"}
            </span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>

        {/* Drawer for mobile */}
        <div className="drawer  drawer-start lg:hidden z-50">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side top-[65px]">
            <label htmlFor="mobile-drawer" className="drawer h-full"></label>
            <ul className="menu  min-h-full p-4 w-60 bg-base-100 text-base-content">
              {renderLinks()}
              <li>
                <Link
                  to="/"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogOut();
                    document.getElementById("mobile-drawer").checked = false;
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
