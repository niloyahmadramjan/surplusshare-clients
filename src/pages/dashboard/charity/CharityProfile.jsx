import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: charity = {}, isLoading } = useQuery({
    queryKey: ["charity-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-requests/user/${user.email}`);
      // console.log(res.data)
      return res.data;
      
    },
  });

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
  }
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d6e4f0] border border-base-300 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <img
            src={user?.photoURL}
            alt="Charity Logo"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-secondary shadow-lg object-cover"
          />

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              {charity?.organization || user?.displayName }
            </h2>

            <p className="text-sm text-base-content/70">
              <span className="font-semibold">Role:</span>{" "}
              <span className="badge badge-secondary text-white">Charity</span>
            </p>

            <div className="text-sm text-base-content/80 space-y-2">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              {charity?.mission && (
                <p><span className="font-medium">Mission:</span> {charity.mission}</p>
              )}
              {charity?.transactionId && (
                <p>
                  <span className="font-medium">Transaction:</span>{" "}
                  <span className="text-accent font-mono">
                    {charity.transactionId.slice(0, 12)}...
                  </span>
                </p>
              )}
              {charity?.status && (
                <p>
                  <span className="font-medium">Request Status:</span>{" "}
                  <span className={`badge text-white ${
                    charity.status === "approved"
                      ? "badge-success"
                      : charity.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}>
                    {charity.status}
                  </span>
                </p>
              )}
              {charity?.requestedAt && (
                <p>
                  <span className="font-medium">Requested At:</span>{" "}
                  {new Date(charity.requestedAt).toLocaleString()}
                </p>
              )}
              {charity?.lastLoginAt && (
                <p>
                  <span className="font-medium">Last Login:</span>{" "}
                  {new Date(charity.lastLoginAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharityProfile;
