
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const ReceivedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["received-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/received/${user.email}`);
      return res.data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post(`/donations/${data.donationId}/reviews`, data);
    },
    onSuccess: () => {
      toast.success("Review submitted");
      queryClient.invalidateQueries(["received-donations", user.email]);
      setSelected(null);
      setReviewText("");
      setRating(5);
    },
    onError: () => toast.error("Failed to submit review"),
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    reviewMutation.mutate({
      donationId: selected.donationId,
      reviewer: {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      description: reviewText,
      rating,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-primary mb-6">Received Donations</h2>

      {isLoading ? (
        <FoodAnimation></FoodAnimation>
      ) : donations.length === 0 ? (
        <p className="text-base-content/70">You haven't picked up any donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 border shadow-md p-4"
            >
              <h3 className="text-lg font-semibold">{item.donationTitle}</h3>
              <p className="text-sm text-base-content/70">{item.restaurantName}</p>
              <p className="text-sm">Type: {item.foodType}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm">
                Pickup Date: {new Date(item.pickupTime).toLocaleDateString()}
              </p>
              <button
                className="btn btn-sm btn-outline btn-primary mt-3"
                onClick={() => setSelected(item)}
              >
                Leave a Review
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-base-content"
              onClick={() => setSelected(null)}
            >✕</button>
            <h3 className="text-xl font-bold mb-4">Review for {selected.donationTitle}</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <textarea
                required
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <div>
                <label className="label-text mb-1">Rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="input input-bordered w-20"
                />
              </div>

              <button type="submit" className="btn btn-success text-white w-full">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
