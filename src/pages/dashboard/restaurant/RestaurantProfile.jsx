import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: restaurant,
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

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        🍽️ Restaurant Profile
      </h2>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-6 border-t-8 border-blue-500">
        {/* Image Section */}
        <div className="w-full lg:w-1/3">
          <img
            src={restaurant.photoURL}
            alt={restaurant.name}
            className="w-full h-60 object-cover rounded-xl border-4 border-blue-200 shadow-sm"
          />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-2/3 space-y-4 text-gray-700">
          <h3 className="text-2xl font-semibold text-blue-600">{restaurant.name}</h3>

          <p className="text-base">
            <span className="font-semibold text-gray-600">Email:</span>{" "}
            {restaurant.email}
          </p>

          <p className="text-base">
            <span className="font-semibold text-gray-600">Role:</span>{" "}
            <span className="badge bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 shadow-md">
              {restaurant.role}
            </span>
          </p>

          <p className="text-base">
            <span className="font-semibold text-gray-600">Last Login:</span>{" "}
            {restaurant.lastLoginAt
              ? format(new Date(restaurant.lastLoginAt), "PPPpp")
              : "Unknown"}
          </p>

          <p className="text-sm text-gray-500 mt-4 italic">
            Thank you for being a responsible food donor!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
