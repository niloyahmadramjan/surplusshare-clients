
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all Accepted requests
  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["my-pickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/pickups/${user.email}`);
      return res.data;
    },
  });
  console.log(pickups)

  // ✅ Confirm pickup mutation
  const pickupMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donation-requests/confirm-pickup/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pickup confirmed!");
      queryClient.invalidateQueries(["my-pickups", user.email]);
    },
    onError: () => toast.error("Failed to confirm pickup"),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-primary mb-6">My Pickups</h2>

      {isLoading ? (
        <FoodAnimation></FoodAnimation>
      ) : pickups.length === 0 ? (
        <p className="text-base-content/70">No accepted requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body space-y-2">
                <h3 className="card-title text-lg font-semibold">
                  {pickup.donationTitle}
                </h3>
                <p className="text-sm text-base-content/70">
                  {pickup.restaurantName} — {pickup.location}
                </p>
                <p className="text-sm">
                  Type: <span className="badge badge-info text-white">{pickup.foodType}</span>
                </p>
                <p className="text-sm">Quantity: {pickup.quantity}</p>
                <p className="text-sm">
                  Pickup Time: <span className="text-accent font-medium">{pickup.pickupTime}</span>
                </p>
                <p className="text-sm">
                  Status: {" "}
                  <span className={`badge ${pickup.status === "Picked Up" ? "badge-success" : "badge-warning"}`}>
                    {pickup.status}
                  </span>
                </p>

                {pickup.status === "Accepted" && (
                  <button
                    onClick={() => pickupMutation.mutate(pickup._id)}
                    className="btn btn-sm btn-success text-white mt-2"
                  >
                    Confirm Pickup
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

export default MyPickups;
