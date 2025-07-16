import React from "react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/lottieanimation/donateanimation.json";
import { Link } from "react-router";
import { FaHeart, FaList, FaMoneyCheckAlt, FaUserShield } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: favorites = [], isLoading: favLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
  });

  const { data: transactions = [], isLoading: transLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions/${user.email}`);
      return res.data;
    },
  });

  const { data: charityRequest = {}, isLoading: charityLoading } = useQuery({
    queryKey: ["charity-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-role/${user.email}`);
      return res.data;
    },
  });

  if (
    userLoading ||
    favLoading ||
    reviewsLoading ||
    transLoading ||
    charityLoading
  ) {
    return (
      <div className="max-w-2/6 mx-auto flex justify-center items-center max-h-full ">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-md text-center space-y-3">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 mx-auto rounded-full border-4 border-secondary shadow"
        />
        <h2 className="text-2xl font-bold text-indigo-700">
          {user?.displayName}
        </h2>
        <p className="text-base text-base-content/70">{user?.email}</p>
        <p className="badge badge-secondary text-sm capitalize">
          Role: {userData?.role || "user"}
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Favorites */}
        <Link
          to="/dashboard/favorites"
          className="bg-pink-100 p-4 rounded-xl shadow-md hover:shadow-xl text-center transition"
        >
          <FaHeart className="text-pink-600 text-3xl mb-2 mx-auto" />
          <h3 className="font-semibold text-lg">Favorites</h3>
          <p className="text-2xl font-bold">{favorites.length}</p>
        </Link>

        {/* Reviews */}
        <Link
          to="/dashboard/my-reviews"
          className="bg-yellow-100 p-4 rounded-xl shadow-md hover:shadow-xl text-center transition"
        >
          <FaList className="text-yellow-600 text-3xl mb-2 mx-auto" />
          <h3 className="font-semibold text-lg">My Reviews</h3>
          <p className="text-2xl font-bold">{reviews.length}</p>
        </Link>

        {/* Payments */}
        <Link
          to="/dashboard/transactions-history"
          className="bg-green-100 p-4 rounded-xl shadow-md hover:shadow-xl text-center transition"
        >
          <FaMoneyCheckAlt className="text-green-600 text-3xl mb-2 mx-auto" />
          <h3 className="font-semibold text-lg">Transactions</h3>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </Link>

        {/* Charity Request */}
        <Link
          to="/dashboard/request-charity-role"
          className="bg-blue-100 p-4 rounded-xl shadow-md hover:shadow-xl text-center transition"
        >
          <FaUserShield className="text-blue-600 text-3xl mb-2 mx-auto" />
          <h3 className="font-semibold text-lg">Charity Request</h3>
          <p className="text-sm mt-1">
            {charityRequest?.status
              ? `Status: ${charityRequest.status}`
              : "Not Requested"}
          </p>
        </Link>
      </div>

      {/* Call to Action */}
      {!charityRequest?.status && (
        <div className="mt-6 text-center">
          <Link
            to="/dashboard/request-charity-role"
            className="btn btn-accent btn-lg"
          >
            Become a Charity Partner
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDashboardHome;
