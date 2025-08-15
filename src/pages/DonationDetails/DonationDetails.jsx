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
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hasRequested, setHasRequested] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: userData } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const role = userData?.role || "user";

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
      const res = await axiosSecure.get(
        `/donation-requests/by-charity/${user.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (userRequests.length) {
      const alreadyRequested = userRequests.some(
        (req) => req.donationId === id
      );
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
        donation_title: donation.title,
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
      reviewerName: user.displayName, 
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


  const { data: reviews = [] } = useQuery({
    queryKey: ["donation-reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allreviews/donation/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <FoodAnimation />;
  if (isError || !donation)
    return (
      <div className="text-center text-red-500">Error loading donation</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-200 rounded-xl shadow-xl">
      <img
        src={donation.imageUrl || "https://via.placeholder.com/600x300"}
        className="w-full h-64 object-cover rounded-lg mb-6"
        alt={donation.title}
      />
      <h2 className="text-3xl font-bold text-primary mb-4">{donation.title}</h2>
      <p className="text-gray-700 mb-4">{donation.description}</p>

      <div className="grid md:grid-cols-2 gap-4 text-gray-800">
        <p className="flex items-center gap-2">
          <User className="w-5 h-5" /> {donation.restaurantName}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5" /> {donation.location}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="w-5 h-5" />{" "}
          {new Date(donation.pickupTime).toLocaleString()}
        </p>
        <p>
          <strong>Quantity:</strong> {donation.quantity}
        </p>
        <p>
          <strong>Status:</strong> {donation.status}
        </p>
        {donation.charityName && (
          <p>
            <strong>Assigned to:</strong> {donation.charityName}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => favoriteMutation.mutate()}
          className="btn btn-outline btn-primary w-full md:w-1/2"
        >
          <Heart className="w-4 h-4 mr-2" /> Save to Favorites
        </button>

        {role === "charity" && (
          <button
            disabled={hasRequested}
            className="btn btn-secondary w-full md:w-1/2 disabled:opacity-50"
            onClick={() => document.getElementById("request_modal").showModal()}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />{" "}
            {hasRequested ? "Already Requested" : "Request Pickup"}
          </button>
        )}
      </div>

      <div className="mt-10 border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-accent">Customer Reviews</h3>
          <button
            className="btn btn-sm btn-accent"
            onClick={() => document.getElementById("review_modal").showModal()}
          >
            <Star className="w-4 h-4 mr-1" /> Add Review
          </button>
        </div>

        <div className="grid gap-4">
          {reviews?.length ? (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-xl p-4 shadow flex gap-4 items-start"
              >
                <img
                  src={r.reviewerInfo.photoURL}
                  alt={r.reviewerName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <div className="flex flex-col items-start justify-between">
                    <h4 className="font-semibold text-lg">{r.reviewerName}</h4>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <svg
                          key={num}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={num <= r.rating ? "#facc15" : "none"}
                          viewBox="0 0 24 24"
                          stroke="#facc15"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11.48 3.499a.75.75 0 011.04 0l2.295 2.296a.75.75 0 00.53.22h3.24a.75.75 0 01.64 1.14l-2.27 3.519a.75.75 0 000 .822l2.27 3.519a.75.75 0 01-.64 1.14h-3.24a.75.75 0 00-.53.22l-2.295 2.296a.75.75 0 01-1.04 0l-2.295-2.296a.75.75 0 00-.53-.22H5.48a.75.75 0 01-.64-1.14l2.27-3.519a.75.75 0 000-.822L4.84 7.155a.75.75 0 01.64-1.14h3.24a.75.75 0 00.53-.22l2.295-2.296z"
                          />
                        </svg>
                      ))}
                      <span className="ml-1 text-base">{r.rating} / 5</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{r.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Request Modal */}
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
              className="input input-bordered w-full"
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

      {/* Review Modal */}
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
              value={user?.displayName || "Unknown"}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />

            <textarea
              className="textarea textarea-bordered w-full"
              required
              placeholder="Write your review here..."
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <svg
                  key={num}
                  onClick={() => setRating(num)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating >= num ? "#facc15" : "none"}
                  viewBox="0 0 24 24"
                  stroke="#facc15"
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.48 3.499a.75.75 0 011.04 0l2.295 2.296a.75.75 0 00.53.22h3.24a.75.75 0 01.64 1.14l-2.27 3.519a.75.75 0 000 .822l2.27 3.519a.75.75 0 01-.64 1.14h-3.24a.75.75 0 00-.53.22l-2.295 2.296a.75.75 0 01-1.04 0l-2.295-2.296a.75.75 0 00-.53-.22H5.48a.75.75 0 01-.64-1.14l2.27-3.519a.75.75 0 000-.822L4.84 7.155a.75.75 0 01.64-1.14h3.24a.75.75 0 00.53-.22l2.295-2.296z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-lg text-yellow-500 font-semibold">
                {rating} / 5
              </span>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
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
