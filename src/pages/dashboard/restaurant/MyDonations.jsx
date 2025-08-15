import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["my-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donations?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: deleteDonation } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation deleted");
      queryClient.invalidateQueries(["my-donations"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  const { mutate: updateDonation } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/my-donations/${data._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation updated");
      queryClient.invalidateQueries(["my-donations"]);
      setEditData(null);
      setPreviewImage(null);
    },
    onError: () => toast.error("Update failed"),
  });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imageUrl = editData.imageUrl;

    if (form.image.files[0]) {
      const formDataImage = new FormData();
      formDataImage.append("image", form.image.files[0]);

      const imgbbApiKey = import.meta.env.VITE_imgbbApi_Key;
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formDataImage
      );
      imageUrl = imgbbRes?.data?.data?.url;
    }

    const updated = {
      _id: editData._id,
      title: form.title.value,
      foodType: form.foodType.value,
      quantity: form.quantity.value,
      location: form.location.value,
      pickupTime: form.pickupTime.value,
      imageUrl,
    };
    updateDonation(updated);
  };

  const confirmDelete = (donation) => {
    if (donation.status === "Verified") {
      return toast.error("You cannot delete a verified donation.");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the donation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDonation(donation._id);
      }
    });
  };

  if (isLoading) return <FoodAnimation></FoodAnimation>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📦 My Donations</h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card shadow-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50"
            >
              <figure>
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="h-56 w-full object-cover"
                />
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title">{donation.title}</h2>
                <p><strong>Food Type:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      donation.status === "Pending"
                        ? "badge-warning"
                        : donation.status === "Verified"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {donation.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {format(new Date(donation.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>

                <div className="flex justify-between mt-3">
                  {donation.status === "Pending" && (
                    <button
                      onClick={() => {
                        setEditData(donation);
                        setPreviewImage(donation.imageUrl);
                      }}
                      className="btn btn-sm btn-info hover:scale-105 transition"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => confirmDelete(donation)}
                    className="btn btn-sm btn-error hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editData && (
        <dialog id="edit_modal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Donation</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input type="text" name="title" defaultValue={editData.title} className="input input-bordered w-full" placeholder="Donation Title" required />
              <input type="text" name="foodType" defaultValue={editData.foodType} className="input input-bordered w-full" placeholder="Food Type" required />
              <input type="text" name="quantity" defaultValue={editData.quantity} className="input input-bordered w-full" placeholder="Quantity" required />
              <input type="text" name="location" defaultValue={editData.location} className="input input-bordered w-full" placeholder="Location" required />
             <input
  type="datetime-local"
  name="pickupTime"
  defaultValue={editData.pickupTime?.slice(0, 16)}
  min={new Date().toISOString().slice(0, 16)} 
  className="input input-bordered w-full"
  required
/>


              <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setPreviewImage(URL.createObjectURL(e.target.files[0]))} />
              {previewImage && <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover rounded" />}

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setEditData(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyDonations;
