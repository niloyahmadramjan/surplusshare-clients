import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");

  // 🔍 Handle search filter
  const filterUsers = (users) => {
    return users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // 🧾 Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // 🛠️ Role assignment
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/admin/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => toast.error("Failed to update role"),
  });

  // ❌ Delete user (Mongo + Firebase)
  const deleteMutation = useMutation({
    mutationFn: async ({ mongoId, firebaseUID }) => {
      const res = await axiosSecure.delete(
        `/admin/users/${mongoId}?firebaseUID=${firebaseUID}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const handleMakeRole = (id, role) => {
    roleMutation.mutate({ id, role });
  };

  const handleDelete = (mongoId, firebaseUID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ mongoId, firebaseUID });
      }
    });
  };

  if (isLoading) {
    return <FoodAnimation></FoodAnimation>
  }

  const filteredUsers = filterUsers(users);

  return (
    <div className="p-4 md:p-8 h-screen bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-pink-800 mb-4">Manage Users</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <table className="table w-full text-sm md:text-base">
        <thead className="bg-pink-200 text-pink-900">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={user._id} className="hover:bg-pink-50 transition-all">
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td className="text-blue-800">{user.email}</td>
              <td>
                <span className="badge badge-info">{user.role}</span>
              </td>
              <td className="py-2">
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center items-center">
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-accent"
                      onClick={() => handleMakeRole(user._id, "admin")}
                    >
                      Admin
                    </button>
                  )}
                  {user.role !== "restaurant" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handleMakeRole(user._id, "restaurant")}
                    >
                      Restaurant
                    </button>
                  )}
                  {user.role !== "charity" && (
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => handleMakeRole(user._id, "charity")}
                    >
                      Charity
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(user._id, user.firebaseUID)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔔 Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-6 text-gray-500">No users match your search.</div>
      )}
    </div>
  );
};

export default ManageUsers;
