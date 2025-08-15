import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdRequestPage, MdFoodBank } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const RestaurantDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: restaurant, isError, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: donations = [] } = useQuery({
    queryKey: ["my-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donations?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["requested-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-requests?restaurantEmail=${user?.email}`);
      return res.data;
    },
  });

  const pendingRequests = requests.filter(req => req.status === "Pending");
  const acceptedRequests = requests.filter(req => req.status === "Accepted");
  const rejectedRequests = requests.filter(req => req.status === "Rejected");

  if (isLoading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (isError) return <p className="text-center text-red-500">Failed to fetch user data.</p>;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        🍽️ Restaurant Dashboard - {restaurant.name}
      </h2>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md p-4 rounded-xl border-t-4 border-blue-500">
          <div className="text-blue-500 text-3xl mb-2"><MdFoodBank /></div>
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-2xl font-bold text-gray-700">{donations.length}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-xl border-t-4 border-purple-500">
          <div className="text-purple-500 text-3xl mb-2"><MdRequestPage /></div>
          <h3 className="text-lg font-semibold">Pending Requests</h3>
          <p className="text-2xl font-bold text-gray-700">{pendingRequests.length}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-xl border-t-4 border-green-500">
          <div className="text-green-500 text-3xl mb-2"><FaCheckCircle /></div>
          <h3 className="text-lg font-semibold">Accepted Requests</h3>
          <p className="text-2xl font-bold text-gray-700">{acceptedRequests.length}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-xl border-t-4 border-red-500">
          <div className="text-red-500 text-3xl mb-2"><MdRequestPage /></div>
          <h3 className="text-lg font-semibold">Rejected Requests</h3>
          <p className="text-2xl font-bold text-gray-700">{rejectedRequests.length}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-400 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={restaurant.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-200"
          />
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold text-blue-600">{restaurant.name}</h3>
            <p><strong>Email:</strong> {restaurant.email}</p>
            <p><strong>Role:</strong> <span className="badge badge-info text-white">{restaurant.role}</span></p>
            <p><strong>Last Login:</strong> {restaurant.lastLoginAt ? format(new Date(restaurant.lastLoginAt), "PPPpp") : "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
