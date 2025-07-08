import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, Leaf } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Donations", href: "/donations" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="bg-base-100 shadow sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">SurplusShare</span>
          </Link>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="btn btn-ghost text-base"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
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
                  <Link to="/dashboard/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button >Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 border-t">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-ghost text-left"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="dropdown">
                <div className="flex items-center gap-2 mt-2">
                  <img src={user.photoURL} alt="user" className="w-10 rounded-full" />
                  <span className="font-semibold">{user.displayName}</span>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <Link to="/dashboard/profile" className="btn btn-sm btn-outline">
                    Profile
                  </Link>
                  <Link to="/dashboard" className="btn btn-sm btn-outline">
                    Dashboard
                  </Link>
                  <button className="btn btn-sm btn-error">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline btn-primary w-full mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
