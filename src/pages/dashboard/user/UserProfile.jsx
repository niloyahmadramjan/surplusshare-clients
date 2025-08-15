import { useQuery } from "@tanstack/react-query";
import { MapPin, Mail, BadgeCheck } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
  }

  const { name, email, photoURL, role, contact = "Not added", lastLoginAt } = userData;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-base-200 rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img src={photoURL} alt={name} />
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left space-y-3 w-full">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center md:justify-start gap-2">
            {name}
            {role && role !== "user" && (
              <div className="badge badge-secondary text-xs capitalize">{role}</div>
            )}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-2 text-base-content/70">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-base-content/70">
            <MapPin className="h-4 w-4" />
            <span>Contact: {contact}</span>
          </div>

          <div className="text-sm text-base-content/50">
            Last login: {new Date(lastLoginAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
