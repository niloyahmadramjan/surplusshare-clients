import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const RestaurantStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurant-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant/stats/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <FoodAnimation />;
  if (isError || !stats.length)
    return (
      <div className="text-center text-red-500 py-10">
        No donation statistics found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg my-10">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">
        📊 Monthly Donation Statistics
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 14 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#14b8a6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RestaurantStatistics;
