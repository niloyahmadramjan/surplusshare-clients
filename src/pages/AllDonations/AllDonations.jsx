import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Clock, MapPin } from "lucide-react";
import FoodAnimation from "../LoadingAnimation/FoodLoading";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const getStatusClass = (status) => {
  switch (status) {
    case "Available":
      return "bg-success text-white text-xs px-3 py-1 rounded-full";
    case "Requested":
      return "bg-warning text-white text-xs px-3 py-1 rounded-full";
    case "Picked Up":
      return "bg-info text-white text-xs px-3 py-1 rounded-full";
    case "Accepted":
      return "bg-secondary text-white text-xs px-3 py-1 rounded-full";
    default:
      return "bg-accent text-white text-xs px-3 py-1 rounded-full";
  }
};

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/verified-donations");
      return res.data;
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: async (donationId) => {
      await axiosSecure.post("/favorites", {
        donationId,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Added to favorites!");
      queryClient.invalidateQueries(["favorites", user.email]);
    },
    onError: () => toast.error("Failed to add to favorites."),
  });

  const isFavorited = (donationId) => {
    return favorites?.some((fav) => fav.donationId === donationId);
  };

  if (isLoading) return <FoodAnimation />;
  if (isError)
    return (
      <div className="text-center text-red-500">Error loading donations</div>
    );

  // 🔍 Filter + Sort
  let sortedDonations = [...donations];

  if (sortType === "quantity-asc") {
    sortedDonations.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
  } else if (sortType === "quantity-desc") {
    sortedDonations.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
  } else if (sortType === "pickup-new") {
    sortedDonations.sort((a, b) => new Date(b.pickupTime) - new Date(a.pickupTime));
  } else if (sortType === "pickup-old") {
    sortedDonations.sort((a, b) => new Date(a.pickupTime) - new Date(b.pickupTime));
  }

  const filteredDonations = sortedDonations.filter((item) =>
    item.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const visibleDonations = showAll ? filteredDonations : filteredDonations.slice(0, 8);

  return (
    <section className="my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Featured Donations
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover fresh surplus food from local restaurants ready for pickup
            by registered charities.
          </p>
        </div>

        {/* 🔍 Search & Sort */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by location..."
            className="input input-bordered w-full md:max-w-sm"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:max-w-xs"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="quantity-asc">Quantity: Low to High</option>
            <option value="quantity-desc">Quantity: High to Low</option>
            <option value="pickup-new">Pickup Time: Newest First</option>
            <option value="pickup-old">Pickup Time: Oldest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDonations.map((item) => (
            <div
              key={item._id}
              className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="relative">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/300"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

                <button
                  onClick={() => favoriteMutation.mutate(item._id)}
                  className="absolute cursor-pointer top-3 left-3 bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
                  title={
                    isFavorited(item._id)
                      ? "Already in Favorites"
                      : "Add to Favorites"
                  }
                >
                  {isFavorited(item._id) ? (
                    <FaHeart className="text-pink-600 text-lg" />
                  ) : (
                    <FaHeart className="text-gray-400 text-lg" />
                  )}
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="inline-block mt-1 text-sm px-2 py-1 bg-primary/10 text-secondary rounded">
                    Food Donation
                  </span>
                </div>

                <div>
                  <div className="font-medium text-base-content">
                    {item.restaurantName}
                  </div>
                  <div className="flex items-center text-sm text-base-content/70">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-base-content">
                    {item.quantity}
                  </span>
                  <div className="flex items-center text-warning">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(item.pickupTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <Link
                  to={`/donation/${item._id}`}
                  className={`btn w-full ${
                    item.status === "Available" ? "btn-accent" : "btn-outline"
                  }`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {!showAll && donations.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-outline btn-lg px-8"
            >
              View All Donations
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllDonations;
