import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔍 Get all donation requests from charities
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charity-donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/charity-donation-requests");
      return res.data;
    },
  });

  // ❌ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin/charity-donation-requests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request deleted successfully");
      queryClient.invalidateQueries(["charity-donation-requests"]);
    },
    onError: () => toast.error("Failed to delete request"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-100 to-cyan-100 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
        Manage Donation Requests
      </h2>

      <table className="table w-full text-sm md:text-base">
        <thead className="bg-green-200 text-green-900">
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={req._id} className="hover:bg-green-50 transition-all">
              <td>{idx + 1}</td>
              <td>{req.donationTitle}</td>
              <td>{req.charityName}</td>
              <td className="text-blue-700">{req.charityEmail}</td>
              <td>{req.description}</td>
              <td className="py-2 text-center">
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(req._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <div className="text-center py-6 text-gray-500">No donation requests found.</div>
      )}
    </div>
  );
};

export default ManageRequests;
