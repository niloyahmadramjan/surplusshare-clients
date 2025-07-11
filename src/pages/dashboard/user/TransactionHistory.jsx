import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="overflow-x-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx._id}>
                <th>{index + 1}</th>
                <td className="break-all">{tx.transactionId}</td>
                <td>${tx.amount}</td>
                <td>
                  {tx.date ? format(new Date(tx.date), "PPP p") : "Unknown"}
                </td>

                <td>
                  <span
                    className={`badge ${
                      tx.status === "Approved"
                        ? "badge-success"
                        : tx.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
