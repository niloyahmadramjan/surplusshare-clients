import React from "react";
import UserDashboardHome from "./user/UserDashboardHome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
    <div>{role === "user" && <UserDashboardHome></UserDashboardHome>}</div>
  );
};

export default DashboardHome;
