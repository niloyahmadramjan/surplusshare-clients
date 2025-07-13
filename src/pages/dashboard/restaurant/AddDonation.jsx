import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: addDonation, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/donations", formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation added successfully!");
      reset();
      setImagePreview(null);
      queryClient.invalidateQueries(["donations"]);
    },
    onError: () => toast.error("Failed to add donation"),
  });

  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    try {
      // ✅ Upload image to imgbb using Axios
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = import.meta.env.VITE_imgbbApi_Key;
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const imageUrl = imgbbRes?.data?.data?.url;
      const donationData = {
        title: data.title,
        description: data.description,
        foodType: data.foodType,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
        restaurantName: user?.displayName,
        restaurantEmail: user?.email,
        location: data.location,
        imageUrl,
      };

      await addDonation(donationData);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 shadow-md rounded-2xl p-6 md:p-10 border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          Add Surplus Food Donation 🍽️
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="label text-blue-700 font-semibold">
              Donation Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full hover:border-blue-500"
              placeholder="e.g. Surplus Pastries"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div>
            <label className="label text-blue-700 font-semibold">
              Food Type
            </label>
            <input
              type="text"
              {...register("foodType", { required: true })}
              className="input input-bordered w-full hover:border-blue-500"
              placeholder="e.g. Bakery, Produce"
            />
          </div>

          <div>
            <label className="label text-blue-700 font-semibold">
              Quantity
            </label>
            <input
              type="text"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full hover:border-blue-500"
              placeholder="e.g. 10 trays or 5 kg"
            />
          </div>

          <div>
            <label className="label text-blue-700 font-semibold">
              Pickup Time
            </label>
            <input
              type="datetime-local"
              {...register("pickupTime", { required: true })}
              min={new Date().toISOString().slice(0, 16)}
              className="input input-bordered w-full hover:border-blue-500"
            />
          </div>

          <div>
            <label className="label text-blue-700 font-semibold">
              Restaurant Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input bg-base-200 text-gray-500 w-full"
            />
          </div>

          <div>
            <label className="label text-blue-700 font-semibold">
              Restaurant Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input bg-base-200 text-gray-500 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label text-blue-700 font-semibold">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="input input-bordered w-full hover:border-blue-500"
              placeholder="e.g. 123 Street, Kuala Lumpur"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label text-blue-700 font-semibold">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full hover:border-blue-500"
              placeholder="e.g. Freshly packed surplus biryani. Still warm and good to eat."
              rows={3}
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="label text-blue-700 font-semibold">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full hover:border-blue-500"
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-xl shadow-md w-40 h-40 object-cover border-2 border-blue-300"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-secondary w-full hover:shadow-lg transition duration-200"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "➕ Add Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
