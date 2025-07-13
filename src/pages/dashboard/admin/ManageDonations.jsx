import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load all donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["admin-manage-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/donations");
      return res.data;
    },
  });

  // Mutation to update donation status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/admin/donations/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation status updated");
      queryClient.invalidateQueries(["admin-manage-donations"]);
    },
    onError: () => toast.error("Failed to update donation"),
  });

  const handleAction = (id, status) => {
    mutation.mutate({ id, status });
  };

  if (isLoading) {
    return <div className="text-center py-10 text-primary text-lg">Loading donations...</div>;
  }

  return (
    <div className="p-4 lg:p-8 h-screen bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Manage Donations
      </h2>

      <table className="table w-full text-sm md:text-base">
        <thead className="bg-blue-200 text-blue-900">
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Food Type</th>
            <th>Restaurant Name</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id} className="hover:bg-blue-50 transition-all">
              <td>{index + 1}</td>
              <td>{donation.title}</td>
              <td>{donation.foodType}</td>
              <td>{donation.restaurantName}</td>
              <td className="text-blue-700">{donation.restaurantEmail}</td>
              <td>{donation.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    donation.status === "Verified"
                      ? "badge-success"
                      : donation.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="space-x-2 text-center">
                {donation.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAction(donation._id, "Verified")}
                    >
                      Verify
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleAction(donation._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonations;
