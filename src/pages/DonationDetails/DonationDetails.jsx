import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Clock, MapPin, User, Heart, ShoppingBag, Star } from "lucide-react";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import FoodAnimation from "../LoadingAnimation/FoodLoading";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [pickupTime, setPickupTime] = useState("");
  const [description, setDescription] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hasRequested, setHasRequested] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: donation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: userRequests = [] } = useQuery({
    queryKey: ["user-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/by-charity/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (userRequests.length) {
      const alreadyRequested = userRequests.some(req => req.donationId === id);
      setHasRequested(alreadyRequested);
    }
  }, [userRequests, id]);

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/favorites", {
        donationId: id,
        userEmail: user.email,
      });
    },
    onSuccess: () => toast.success("Added to favorites!"),
    onError: () => toast.error("Failed to add to favorites."),
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/donation-requests", {
        charityName: user.displayName,
        charityEmail: user.email,
        donationId: id,
        description,
        pickupTime,
        donation_title: null,
      });
    },
    onSuccess: () => toast.success("Request submitted!"),
    onError: () => toast.error("Failed to submit request."),
  });

  const reviewMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post(`/donations/${id}/reviews`, {
        reviewerInfo: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        reviewerName: reviewer,
        description: reviewText,
        rating: rating,
      });
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      queryClient.invalidateQueries(["donation", id]);
    },
    onError: () => toast.error("Failed to submit review."),
  });

  if (isLoading) return <FoodAnimation></FoodAnimation>;
  if (isError || !donation)
    return (
      <div className="text-center text-red-500">Error loading donation</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
      <img
        src={donation.imageUrl || "https://via.placeholder.com/600x300"}
        className="w-full h-60 object-cover rounded-lg mb-4"
        alt={donation.title}
      />
      <h2 className="text-2xl font-bold mb-2 text-primary">{donation.title}</h2>
      <p className="text-base-content/80 mb-4">{donation.description}</p>

      <div className="grid gap-3 text-base-content/90">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" /> {donation.restaurantName}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {donation.location}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />{" "}
          {new Date(donation.pickupTime).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Quantity:</span> {donation.quantity}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {donation.status}
        </div>
        {donation.charityName && (
          <div>
            <span className="font-semibold">Assigned to:</span>{" "}
            {donation.charityName}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={() => favoriteMutation.mutate()}
          className="btn btn-outline btn-primary w-full"
        >
          <Heart className="w-4 h-4 mr-2" /> Save to Favorites
        </button>

        {user?.role !== "user" && (
          <button
            disabled={hasRequested}
            className="btn btn-secondary w-full disabled:opacity-60"
            onClick={() => document.getElementById("request_modal").showModal()}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {hasRequested ? "Already Requested" : "Request Pickup"}
          </button>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          className="btn btn-outline btn-accent"
          onClick={() => document.getElementById("review_modal").showModal()}
        >
          <Star className="w-4 h-4 mr-2" /> Add Review
        </button>
      </div>

      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request Donation</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestMutation.mutate();
              document.getElementById("request_modal").close();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              readOnly
              value={user?.displayName || "unknown"}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              readOnly
              value={user.email || "unknown"}
              className="input input-bordered w-full"
            />
            <input
              type="datetime-local"
              onChange={(e) => setPickupTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="input input-bordered w-full hover:border-blue-500"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              required
              placeholder="Why do you need this?"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("request_modal").close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Review</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reviewMutation.mutate();
              document.getElementById("review_modal").close();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your name"
              required
              className="input input-bordered w-full"
              onChange={(e) => setReviewer(e.target.value)}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              required
              placeholder="Write your review here..."
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1 to 5)"
              required
              className="input input-bordered w-full"
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("review_modal").close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;