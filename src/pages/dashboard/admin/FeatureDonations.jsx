import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🧾 Get verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/verified-donations");
      return res.data;
    },
  });

  // ✅ Add to featured
  const featureMutation = useMutation({
    mutationFn: async (donation) => {
      const res = await axiosSecure.post("/admin/feature-donation", donation);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation featured!");
      queryClient.invalidateQueries(["verified-donations"]);
    },
    onError: () => toast.error("Failed to feature donation"),
  });

  const handleFeature = (donation) => {
    featureMutation.mutate(donation);
  };

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
   }

  return (
    <div className="h-screen p-4 md:p-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        Feature Donations
      </h2>

      <table className="table w-full text-sm md:text-base">
        <thead className="bg-indigo-200 text-indigo-900">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Food Type</th>
            <th>Restaurant</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, idx) => (
            <tr key={donation._id} className="hover:bg-indigo-50 transition-all">
              <td>{idx + 1}</td>
              <td>
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-12 h-12 object-cover rounded-lg border"
                />
              </td>
              <td>{donation.title}</td>
              <td>{donation.foodType}</td>
              <td className="text-blue-700">{donation.restaurantName}</td>
              <td className="text-center">
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => handleFeature(donation)}
                >
                  Feature
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {donations.length === 0 && (
        <div className="text-center py-6 text-gray-500">No verified donations found.</div>
      )}
    </div>
  );
};

export default FeatureDonations;
