import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";
import useAuth from "../../../hooks/useAuth";

const CharityDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // Charity profile info

   const { data: charity = {}, isLoading } = useQuery({
      queryKey: ["charity-profile", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/charity-requests/user/${user.email}`);
        // console.log(res.data)
        return res.data;
        
      },
    });

  // All requests made by charity
  const { data: requests = [], isLoading: loadingRequests } = useQuery({
    queryKey: ["my-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/by-charity/${user.email}`);
      return res.data;
    },
  });

  // All pickups accepted
  const { data: pickups = [], isLoading: loadingPickups } = useQuery({
    queryKey: ["my-pickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/pickups/${user.email}`);
      return res.data;
    },
  });

  // All received donations
  const { data: donations = [], isLoading: loadingDonations } = useQuery({
    queryKey: ["received-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/received/${user.email}`);
      return res.data;
    },
  });

  // Cancel donation request
  const cancelMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/donation-requests/${id}`),
    onSuccess: () => {
      toast.success("Request cancelled");
      queryClient.invalidateQueries(["my-requests", user.email]);
    },
    onError: () => toast.error("Failed to cancel request"),
  });

  // Confirm pickup
  const pickupMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/donation-requests/confirm-pickup/${id}`),
    onSuccess: () => {
      toast.success("Pickup confirmed");
      queryClient.invalidateQueries(["my-pickups", user.email]);
    },
    onError: () => toast.error("Failed to confirm pickup"),
  });

  // Submit review
  const reviewMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.post(`/donations/${data.donationId}/reviews`, data),
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

  // console.log(charity)
  if (isLoading) {
    return <FoodAnimation></FoodAnimation>;
  }

  // Counters
  const totalRequests = requests.length;
  const totalPickups = pickups.length;
  const totalRejected = requests.filter(req => req.status === "rejected").length;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">🎗️ Charity Dashboard</h2>

      {/* Profile Info */}
      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 mb-6 border-l-4 border-primary">
        <h3 className="text-xl font-semibold mb-2">👤 Profile</h3>
        <p><span className="font-medium">Name:</span> {charity.name}</p>
        <p><span className="font-medium">Email:</span> {charity.email}</p>
        <p><span className="font-medium">Organization:</span> {charity.organizationName}</p>
        <p><span className="font-medium">Status:</span> {charity.status}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-primary">
          <h4 className="text-lg font-bold">Total Requests</h4>
          <p className="text-2xl text-primary font-semibold">{totalRequests}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-accent">
          <h4 className="text-lg font-bold">Pickups</h4>
          <p className="text-2xl text-accent font-semibold">{totalPickups}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-error">
          <h4 className="text-lg font-bold">Rejected</h4>
          <p className="text-2xl text-error font-semibold">{totalRejected}</p>
        </div>
      </div>

      {/* Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 border border-secondary">
          <h3 className="text-lg font-semibold mb-2 text-secondary">📦 My Requests</h3>
          {requests.map(req => (
            <div key={req._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <p>{req.donationTitle}</p>
                <p className="text-sm text-gray-500">Status: {req.status}</p>
              </div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => cancelMutation.mutate(req._id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>

        {/* Pickups */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-accent">
          <h3 className="text-lg font-semibold mb-2 text-accent">🚚 My Pickups</h3>
          {pickups.map(pickup => (
            <div key={pickup._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <p>{pickup.donationTitle}</p>
                <p className="text-sm text-gray-500">Pickup Status: {pickup.pickupStatus}</p>
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={() => pickupMutation.mutate(pickup._id)}>
                Confirm
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Received Donations & Review */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">🎁 Received Donations</h3>
        <div className="grid gap-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white shadow rounded-lg p-4 border border-purple-300">
              <p><strong>{donation.donationTitle}</strong></p>
              <p className="text-sm text-gray-600 mb-2">From: {donation.restaurantName}</p>
              <button
                className="btn btn-xs btn-outline btn-info"
                onClick={() => setSelected(donation)}>
                Leave Review
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <form
            onSubmit={handleReviewSubmit}
            className="mt-4 bg-white p-4 border rounded shadow">
            <h4 className="font-semibold mb-2">✍️ Review for: {selected.donationTitle}</h4>
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              rows="3"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
            <div className="flex items-center gap-4 mb-2">
              <span>⭐ Rating:</span>
              <input
                type="number"
                min="1"
                max="5"
                className="input input-bordered w-20"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CharityDashboard;