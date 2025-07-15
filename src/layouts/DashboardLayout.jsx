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
  const navigate = useNavigate()

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

  const handleUserLogOut= ()=>{
    handleLogOut();
    navigate("/")
    
  }

  if (isLoading)
    return <FoodAnimation></FoodAnimation>
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

      case "restaurant":
        return (
          <>
            <Link
              to="restaurant-profile"
              className="btn btn-ghost justify-start"
            >
              <FaUserShield /> Restaurant Profile
            </Link>
            <Link to="add-donation" className="btn btn-ghost justify-start">
              <FaPlusCircle /> Add Donation
            </Link>
            <Link to="my-donations" className="btn btn-ghost justify-start">
              <FaClipboardList /> My Donations
            </Link>
            <Link
              to="requested-donations"
              className="btn btn-ghost justify-start"
            >
              <FaClipboardList /> Requested Donations
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
              to="transactions-history"
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
              to="transactions-history"
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
          onClick={handleUserLogOut}
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
            <span className="font-medium text-sm">
              {user?.displayName || "User"}
            </span>
            <img
              src={user?.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
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
                    handleUserLogOut();
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
