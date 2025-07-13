
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: charity = {}, isLoading } = useQuery({
    queryKey: ["charity-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charities/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-base-300 rounded-2xl p-6 sm:p-10 shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={charity?.photoURL || "https://i.ibb.co/DYpRK0k/avatar.png"}
            alt="Charity Logo"
            className="w-32 h-32 rounded-full border-4 border-primary shadow-sm object-cover"
          />

          <div className="flex-1 space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              {charity?.organization || charity?.name}
            </h2>
            <p className="text-sm text-base-content/70">
              Role: <span className="badge badge-primary text-white">{charity?.role || "Charity"}</span>
            </p>

            <div className="text-sm text-base-content/80 space-y-1 pt-2">
              <p><span className="font-medium">Email:</span> {charity?.email}</p>
              {charity?.mission && (
                <p><span className="font-medium">Mission:</span> {charity.mission}</p>
              )}
              {charity?.transactionId && (
                <p>
                  <span className="font-medium">Transaction:</span> 
                  <span className="text-sm text-accent"> {charity.transactionId.slice(0, 10)}...</span>
                </p>
              )}
              {charity?.status && (
                <p>
                  <span className="font-medium">Request Status:</span> 
                  <span className={`badge ${
                    charity.status === "approved" ? "badge-success" : 
                    charity.status === "rejected" ? "badge-error" : "badge-warning"
                  }`}>{charity.status}</span>
                </p>
              )}
              {charity?.requestedAt && (
                <p><span className="font-medium">Requested At:</span> {new Date(charity.requestedAt).toLocaleString()}</p>
              )}
              {charity?.lastLoginAt && (
                <p><span className="font-medium">Last Login:</span> {new Date(charity.lastLoginAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharityProfile;
