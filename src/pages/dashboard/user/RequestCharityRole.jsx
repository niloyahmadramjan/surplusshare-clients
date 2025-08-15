import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Payment from "../Payment/Payment";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CharityRoleRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Check existing request
  const {
    data: existingRequest,
    isLoading,
  } = useQuery({
    queryKey: ["charity-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-role/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    if (existingRequest?.status === "pending") {
      toast.error("You already have a pending request.");
      return;
    } else if (existingRequest?.status === "approved") {
      toast.error("You already have an approved request.");
      return;
    }

    setFormData(data);
    setShowPayment(true);
  };

  const handleSuccess = () => {
    setShowPayment(false);
    setFormData(null);
    queryClient.invalidateQueries(["charity-role", user?.email]);
    toast.success("Charity request submitted!");
    reset();
  };

  return (
    <div className="lg:px-8">
      <div className="bg-base-100 shadow-xl rounded-xl border border-base-300 p-6 md:p-10 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            Request Charity Role
          </h2>
          <p className="text-secondary text-sm md:text-base">
            Submit your organization details and securely pay to request access
            as a charity.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : existingRequest?.status === "pending" ||
          existingRequest?.status === "approved" ? (
          <div className="alert alert-info shadow-md">
            <span>
              You already have a <b>{existingRequest.status}</b> request. Please
              wait for admin approval.
            </span>
          </div>
        ) : showPayment && formData ? (
          <div className="mt-8 border-t pt-6">
            <Payment formData={formData} onSuccess={handleSuccess} />
          </div>
        ) : (
          <div className="bg-base-100 border border-base-300 rounded-xl p-4 space-y-6 shadow-xl transition-all max-w-xl mx-auto lg:mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label font-medium">Your Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered bg-base-100 w-full"
                  />
                </div>

                <div>
                  <label className="label font-medium">Your Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered bg-base-100 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label font-medium">Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Save the Food Foundation"
                  {...register("organization", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.organization && (
                  <p className="text-error text-sm mt-1">
                    Organization name is required
                  </p>
                )}
              </div>

              <div>
                <label className="label font-medium">Mission Statement</label>
                <textarea
                  rows={4}
                  placeholder="Describe your organization's mission..."
                  {...register("mission", { required: true })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
                {errors.mission && (
                  <p className="text-error text-sm mt-1">
                    Mission statement is required
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-base-300">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-base-content/70 text-sm">Application Fee</p>
                  <p className="text-2xl font-bold text-accent">$25</p>
                </div>
                <button
                  type="submit"
                  className="btn btn-accent px-8 w-full md:w-auto"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityRoleRequest;
