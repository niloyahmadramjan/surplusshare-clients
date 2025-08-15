import { Link } from "react-router";
import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center animate-fade-in-up">
        <div className="flex justify-center mb-4 text-red-500">
          <Frown className="w-16 h-16" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-wide text-white shadow-md hover:scale-105 transition-transform duration-300">
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
