import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔍 Get all charity role requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charity-role-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/charity-role-requests");
      return res.data;
    },
  });

  // ✅ Approve / Reject mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, email, status }) => {
      const res = await axiosSecure.patch(
        `/admin/charity-role-requests/${id}`,
        {
          email,
          status,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request status updated");
      queryClient.invalidateQueries(["charity-role-requests"]);
    },
    onError: () => {
      toast.error("Failed to update request status");
    },
  });
  

  const handleAction = (id, email, status) => {
    Swal.fire({
      title: `Confirm ${status}?`,
      text: `Are you sure you want to ${status.toLowerCase()} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "Approved" ? "#3b82f6" : "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: `Yes, ${status.toLowerCase()} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, email, status });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-primary text-lg">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br h-screen from-yellow-100 to-purple-100 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
        Manage Role Requests
      </h2>

      <table className="table w-full text-sm md:text-base">
        <thead className="bg-purple-200 text-purple-900">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Mission</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={req._id} className="hover:bg-purple-50 transition-all">
              <td>{idx + 1}</td>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.organizationName}</td>
              <td>{req.missionStatement}</td>
              <td className="text-blue-700">{req.transactionId}</td>
              <td>
                <span
                  className={`badge ${
                    req.status === "Approved"
                      ? "badge-success"
                      : req.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="py-2">
                {req.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        handleAction(req._id, req.email, "Approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() =>
                        handleAction(req._id, req.email, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No role requests found.
        </div>
      )}
    </div>
  );
};

export default ManageRoleRequests;
