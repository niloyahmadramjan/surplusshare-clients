import { useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import Logo from "./Logo";
// import { useAuthUser } from "@/hooks/useAuthUser";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const { user, logout } = useAuthUser();
const user = "niloy";
const logout = null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Donations", href: "/donations" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div className="bg-base-100 sticky top-0 z-50 shadow">
      {/* Main Navbar */}
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
         <Logo></Logo>
        </div>

        {/* Right: Mobile Drawer Trigger (only on mobile) */}
        <div className="md:hidden flex-none">
          {!user ? (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-ghost"
            >
              <Menu className="h-6 w-6" />
            </button>
          ) : (
            <div className="avatar" onClick={() => setIsDrawerOpen(true)}>
              <div className="w-10 rounded-full cursor-pointer">
                <img src={user.photoURL} alt="user" />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Right (auth buttons shown only in md+) */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="btn btn-ghost text-base"
            >
              {item.name}
            </Link>
          ))}

          {!user ? (
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="user" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer (only visible on mobile) */}
      <div className={`md:hidden`}>
        {/* Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-40 "
            onClick={() => setIsDrawerOpen(false)}
          ></div>
        )}

        {/* Drawer panel */}
        <div
          className={`fixed top-[66px] right-0 h-full w-52  bg-gray-200 backdrop-blur-lg shadow-lg z-50 transform transition-transform duration-300 ${
    isDrawerOpen ? "translate-x-0" : "translate-x-full"
  }`}
        >
          <div className="p-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsDrawerOpen(false)}
                className="block btn btn-ghost text-left"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="mt-2 ">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn btn-sm btn-outline w-full"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn btn-sm btn-outline w-full"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsDrawerOpen(false);
                  }}
                  className="btn btn-sm btn-error w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-primary text-secondary w-full mt-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
