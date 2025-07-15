import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <FoodAnimation />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="bg-gradient-to-r from-indigo-100 to-blue-50 p-6 rounded-2xl shadow-lg text-center space-y-4">
        <img
          src={admin.photoURL}
          alt="Admin"
          className="w-28 h-28 rounded-full border-4 border-blue-500 shadow mx-auto"
        />
        <h2 className="text-2xl font-semibold text-blue-700 break-words">
          {admin.name || "Admin Name"}
        </h2>
        <p className="text-sm text-gray-600 break-words">
          Email: {admin.email || "N/A"}
        </p>
        <p className="text-sm bg-blue-100 text-blue-600 inline-block px-4 py-1 rounded-full font-medium uppercase tracking-wide">
          Role: {admin.role || "Admin"}
        </p>
        {admin.lastLoginAt && (
          <p className="text-sm text-gray-600">
            Last Login: {new Date(admin.lastLoginAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
