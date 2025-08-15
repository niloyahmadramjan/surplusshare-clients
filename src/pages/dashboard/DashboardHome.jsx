import React from "react";
import UserDashboardHome from "./user/UserDashboardHome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CharityDashboard from "./charity/CharityDashboard";
import RestaurantDashboard from "./restaurant/RestaurantDashboard";
import AdminDashboard from "./admin/AdminDashboard";

const DashboardHome = () => {
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

  return (
    <div>
      {role === "user" && <UserDashboardHome></UserDashboardHome>}
      {role=== "charity" && <CharityDashboard></CharityDashboard>}
      {role === "restaurant" && <RestaurantDashboard></RestaurantDashboard>}
      {role === "admin" && <AdminDashboard></AdminDashboard>}
    </div>
  );
};

export default DashboardHome;
