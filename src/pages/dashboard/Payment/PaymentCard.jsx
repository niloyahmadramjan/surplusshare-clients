import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentCard = ({ clientSecret, formData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) {
      toast.error("Stripe not ready");
      setLoading(false);
      return;
    }

    try {
      const { error: methodErr, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (methodErr) throw new Error(methodErr.message);

      const { error: confirmErr, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmErr) throw new Error(confirmErr.message);

      const transactionId = paymentIntent.id;

      // Save transaction
      await axiosSecure.post("/transactions", {
        email: user.email,
        amount: 25,
        transactionId,
        transaction_status: "success",
        purpose: "Charity Role Request",
      });

      // Save request
      await axiosSecure.post("/charity-role-requests", {
        email: user.email,
        name: user.displayName,
        organization: formData.organization,
        mission: formData.mission,
        transactionId,
        transaction_status: "success",
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Payment successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-base-100 border border-base-300 rounded-xl p-4 space-y-6 shadow-xl transition-all max-w-sm mx-auto mt-4"
    >
      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-secondary mb-1">
          Secure Payment
        </h3>
        <p className="text-sm text-base-content/70">
          Pay with your credit or debit card securely
        </p>
      </div>

      {/* Card Brand Icons */}
      <div className="flex justify-center gap-4 mt-2">
        <img
          src="https://img.icons8.com/color/48/000000/visa.png"
          alt="Visa"
          className="h-8"
        />
        <img
          src="https://img.icons8.com/color/48/000000/mastercard.png"
          alt="Mastercard"
          className="h-8"
        />
        <img
          src="https://img.icons8.com/color/48/000000/discover.png"
          alt="Discover"
          className="h-8"
        />
      </div>

      {/* Card Input */}
      <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-inner focus-within:ring-2 focus-within:ring-primary transition-all">
        <CardElement className="text-base placeholder:text-base-content/50 focus:outline-none" />
      </div>

      {/* Payment Summary */}
      <div className="text-sm bg-base-200 p-3 rounded-lg space-y-1 text-base-content/80">
        <p>
          <span className="font-medium">Amount:</span> $25
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <span className="text-secondary">{user?.email}</span>
        </p>
      </div>

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-accent w-full text-base font-semibold tracking-wide"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </span>
        ) : (
          "Pay $25"
        )}
      </button>

      {/* Footer Notes */}
      <div className="text-center text-xs text-base-content/60 mt-2">
        <p>
          🔒 Your payment is processed securely by Stripe. No card info is
          stored.
        </p>
        <p>💡 100% refund available if your request is rejected.</p>
      </div>
    </form>
  );
};

export default PaymentCard;
