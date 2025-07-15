import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      queryClient.invalidateQueries(["myReviews"]);
    },
    onError: () => toast.error("Failed to delete review."),
  });

  if (isLoading) return <FoodAnimation></FoodAnimation>;

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 shadow-xl border border-gray-200"
          >
            <figure>
              <img
                src={review?.donation?.imageUrl}
                alt={review?.donation?.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">
                {review?.donation?.title}
              </h3>
              <p className="text-sm text-gray-500">
                <strong>Restaurant:</strong> {review?.donation?.restaurantName}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Rating:</strong>{" "}
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </p>

              <p className="text-sm italic text-gray-400">
                {formatDistanceToNow(new Date(review.createdAt))} ago
              </p>
              <p className="mt-2">{review.description}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => deleteMutation.mutate(review._id)}
                  className="btn btn-error btn-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reviews.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No reviews submitted yet.
        </div>
      )}
    </div>
  );
};

export default MyReviews;
