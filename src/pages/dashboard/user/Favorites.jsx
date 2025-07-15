// 🧩 UserFavorites.jsx - Show saved donations for the logged-in user

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const UserFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get user's favorites with joined donation data
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  // ✅ Delete favorite
  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      queryClient.invalidateQueries(["favorites", user.email]);
    },
    onError: () => toast.error("Failed to remove favorite"),
  });

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
  }

  if (!favorites.length) {
    return <div className="text-center py-10 text-base-content/70">No favorites added yet.</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div key={fav._id} className="card shadow-md bg-base-100 border border-base-300">
            <figure>
              <img
                src={fav.donation?.imageUrl || "https://via.placeholder.com/400x300"}
                alt={fav.donation?.title || "No title"}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body space-y-1">
              <h3 className="card-title text-lg font-semibold">{fav.donation?.title}</h3>
              <p className="text-sm text-base-content/70">{fav.donation?.restaurantName} - {fav.donation?.location}</p>
              <p className="text-sm">Quantity: {fav.donation?.quantity}</p>
              <div className="badge badge-info text-white">{fav.donation?.status}</div>
              <div className="mt-3 flex justify-between items-center gap-2">
                <Link
                  to={`/donation/${fav.donationId}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Details
                </Link>
                <button
                  onClick={() => mutation.mutate(fav._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserFavorites;
