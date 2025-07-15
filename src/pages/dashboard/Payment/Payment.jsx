import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentCard from "./PaymentCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const Payment = ({ formData, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (formData?.organization) {
      axiosSecure
        .post("/create-payment-intent", { amount: 25 })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => setClientSecret(""));
    }
  }, [formData, axiosSecure]);

  if (!clientSecret) {
    return <FoodAnimation></FoodAnimation>
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
