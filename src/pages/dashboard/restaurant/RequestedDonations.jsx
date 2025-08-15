import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requested-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity-requests?restaurantEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success(`Request ${variables.status.toLowerCase()} successfully!`);
      queryClient.invalidateQueries(["requested-donations"]);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleAction = (id, action) => {
    Swal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} this request?`,
      icon: action === "Accepted" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: action === "Accepted" ? "#16a34a" : "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatus({ id, status: action });
      }
    });
  };

  if (isLoading) return <FoodAnimation></FoodAnimation>

  return (
  <div className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
    📬 Requested Donations
  </h2>

  {/* Desktop Table */}
  <div className="hidden lg:block overflow-x-auto">
    <table className="table w-full bg-white rounded-lg border border-blue-200 shadow-sm">
      <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900">
        <tr>
          <th className="py-3">Title</th>
          <th>Type</th>
          <th>Charity</th>
          <th>Email</th>
          <th>Description</th>
          <th>Pickup</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr
            key={req._id}
            className="hover:bg-blue-50 text-sm transition-all"
          >
            <td className="font-medium">{req.donation?.title}</td>
            <td>{req.donation?.foodType}</td>
            <td>{req.charityName}</td>
            <td>{req.charityEmail}</td>
            <td>{req.description}</td>
            <td>{req.pickupTime}</td>
            <td>
              <span
                className={`badge text-white ${
                  req.status === "Pending"
                    ? "bg-yellow-500"
                    : req.status === "Accepted"
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
              >
                {req.status}
              </span>
            </td>
            <td>
              {req.status === "Pending" && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleAction(req._id, "Accepted")}
                    className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "Rejected")}
                    className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
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
  </div>

  {/* Mobile & Tablet Cards */}
  <div className="grid gap-4 lg:hidden">
    {requests.map((req) => (
      <div
        key={req._id}
        className="bg-white border border-blue-100 rounded-xl p-4 shadow-md space-y-2"
      >
        <p className="text-base font-semibold">
          {req.donation?.title}
        </p>
        <p className="text-sm"><b>Type:</b> {req.donation?.foodType}</p>
        <p className="text-sm"><b>Charity:</b> {req.charityName}</p>
        <p className="text-sm"><b>Email:</b> {req.charityEmail}</p>
        <p className="text-sm"><b>Description:</b> {req.description}</p>
        <p className="text-sm"><b>Pickup:</b> {req.pickupTime}</p>
        <p className="text-sm">
          <b>Status:</b>{" "}
          <span
            className={`badge text-white ${
              req.status === "Pending"
                ? "bg-yellow-500"
                : req.status === "Accepted"
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          >
            {req.status}
          </span>
        </p>

        {req.status === "Pending" && (
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => handleAction(req._id, "Accepted")}
              className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => handleAction(req._id, "Rejected")}
              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default RequestedDonations;
