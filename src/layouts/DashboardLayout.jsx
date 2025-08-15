import React from "react";
import { NavLink, Outlet } from "react-router";
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

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to fetch user data.</p>
    );

  const role = userData?.role || "user";

  const navItemClass = ({ isActive }) =>
    `btn btn-ghost justify-start group ${isActive ? "bg-primary font-semibold" : ""}`;

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <NavLink to="admin-profile" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaUserShield className="text-cyan-600 group-hover:text-white" /> Admin Profile
            </NavLink>
            <NavLink to="manage-donations" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-blue-600 group-hover:text-white" /> Manage Donations
            </NavLink>
            <NavLink to="manage-users" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaUser className="text-purple-600 group-hover:text-white" /> Manage Users
            </NavLink>
            <NavLink to="manage-roles" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-yellow-600 group-hover:text-white" /> Manage Role Requests
            </NavLink>
            <NavLink to="manage-requests" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-green-600 group-hover:text-white" /> Manage Requests
            </NavLink>
            <NavLink to="feature-donations" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaStar className="text-orange-500 group-hover:text-white" /> Feature Donations
            </NavLink>
          </>
        );
      case "restaurant":
        return (
          <>
            <NavLink to="restaurant-profile" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaUserShield className="text-cyan-600 group-hover:text-white" /> Restaurant Profile
            </NavLink>
            <NavLink to="add-donation" className={navItemClass} onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaPlusCircle className="text-rose-600 group-hover:text-white" /> Add Donation
            </NavLink>
            <NavLink to="my-donations" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-violet-600 group-hover:text-white" /> My Donations
            </NavLink>
            <NavLink to="requested-donations" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-amber-600 group-hover:text-white" /> Requested Donations
            </NavLink>
            <NavLink to="restaurant-statistics" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-lime-600 group-hover:text-white" /> Restaurant Statistics
            </NavLink>
          </>
        );
      case "charity":
        return (
          <>
            <NavLink to="charity-profile" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaUser className="text-teal-600 group-hover:text-white" /> Charity Profile
            </NavLink>
            <NavLink to="my-requests" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-rose-600 group-hover:text-white" /> My Requests
            </NavLink>
            <NavLink to="my-pickups" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-emerald-600 group-hover:text-white" /> My Pickups
            </NavLink>
            <NavLink to="received-donations" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHeart className="text-pink-600 group-hover:text-white" /> Received Donations
            </NavLink>
            <NavLink to="favorites" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHeart className="text-pink-400 group-hover:text-white" /> Favorites
            </NavLink>
            <NavLink to="transactions-history" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHistory className="text-yellow-500 group-hover:text-white" /> Transaction History
            </NavLink>
          </>
        );
      default:
        return (
          <>
            <NavLink to="my-profile" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaUser className="text-indigo-500 group-hover:text-white" /> My Profile
            </NavLink>
            <NavLink to="request-charity-role" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHandsHelping className="text-amber-600 group-hover:text-white" /> Request Charity Role
            </NavLink>
            <NavLink to="favorites" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHeart className="text-pink-400 group-hover:text-white" /> Favorites
            </NavLink>
            <NavLink to="my-reviews" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaClipboardList className="text-green-500 group-hover:text-white" /> My Reviews
            </NavLink>
            <NavLink to="transactions-history" className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHistory className="text-yellow-500 group-hover:text-white" /> Transaction History
            </NavLink>
          </>
        );
    }
  };

  return (
    <div className="drawer drawer-start lg:drawer-open">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content area */}
      <div className="drawer-content flex flex-col w-full h-screen">
        {/* Mobile navbar */}
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

        {/* Content */}
        <div className="mt-20 md:mt-0 p-2 overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50 top-[65px]">
        <label htmlFor="mobile-drawer" className="drawer"></label>
        <div className="menu p-4 w-62 min-h-full bg-base-200">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        
           <NavLink to="/dashboard" end  className={navItemClass}  onClick={() => {
              document.getElementById("mobile-drawer").checked = false;
            }}>
              <FaHome className="text-cyan-600 group-hover:text-white" /> Dashboard
            </NavLink>

          {renderLinks()}

          <NavLink to="/" className={navItemClass} >
            <FaHome className="text-blue-600 group-hover:text-white" /> Home
          </NavLink>

          <NavLink to="/logout" className={navItemClass}>
            <FaSignOutAlt className="text-red-600 group-hover:text-white" /> Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
