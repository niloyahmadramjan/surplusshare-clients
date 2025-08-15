import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/by-charity/${user.email}`
      );
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request cancelled successfully");
      queryClient.invalidateQueries(["my-requests", user.email]);
    },
    onError: () => toast.error("Failed to cancel request"),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-primary mb-6">
        My Donation Requests
      </h2>

      {isLoading ? (
        <FoodAnimation></FoodAnimation>
      ) : requests.length === 0 ? (
        <p className="text-base-content/70">
          You haven't made any donation requests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body space-y-2">
                <h3 className="card-title text-lg font-semibold">
                  {req.donationTitle}
                </h3>
                <p className="text-sm text-base-content/70">
                  {req.restaurantName}
                </p>
                <p className="text-sm">
                  Type:{" "}
                  <span className="badge badge-info text-white">
                    {req.foodType}
                  </span>
                </p>
                <p className="text-sm">Quantity: {req.quantity}</p>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`badge ${
                      req.status === "Accepted"
                        ? "badge-success"
                        : req.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "Pending" && (
                  <button
                    onClick={() => cancelMutation.mutate(req._id)}
                    className="btn btn-sm btn-error text-white mt-2"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
