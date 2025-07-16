import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentCard from "./PaymentCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = ({ formData, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", { amount: 25 });
      return res.data;
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: () => {
      setClientSecret("");
    },
  });

  useEffect(() => {
    if (formData?.organization) {
      mutate();
    }
  }, [formData, mutate]);

  if (!clientSecret || isPending) {
    return <FoodAnimation />;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentCard
        clientSecret={clientSecret}
        formData={formData}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default Payment;
