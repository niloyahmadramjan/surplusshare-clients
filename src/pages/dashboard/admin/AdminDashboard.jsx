import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FoodAnimation from "../../LoadingAnimation/FoodLoading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: admin = {}, isLoading: adminLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => (await axiosSecure.get("/admin/users")).data,
  });

  const { data: donations = [] } = useQuery({
    queryKey: ["admin-donations"],
    queryFn: async () => (await axiosSecure.get("/admin/donations")).data,
  });

  const { data: donationRequests = [] } = useQuery({
    queryKey: ["charity-donation-requests"],
    queryFn: async () => (await axiosSecure.get("/admin/charity-donation-requests")).data,
  });

  const { data: roleRequests = [] } = useQuery({
    queryKey: ["charity-role-requests"],
    queryFn: async () => (await axiosSecure.get("/admin/charity-role-requests")).data,
  });

  if (adminLoading) return <FoodAnimation />;

  const totalUsers = users.length;
  const newUsers = users.filter(u => new Date(u.lastLoginAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

//   const totalDonations = donations.length;
  const verifiedDonations = donations.filter(d => d.status === "Verified");
  const rejectedDonations = donations.filter(d => d.status === "Rejected");
  const pendingDonations = donations.filter(d => d.status === "Pending");

  const totalRequests = donationRequests.length;
  const acceptedRequests = donationRequests.filter(r => r.status === "Accepted");
  const rejectedRequests = donationRequests.filter(r => r.status === "Rejected");
  const pickedUpRequests = donationRequests.filter(r => r.status === "Picked Up");

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        👨‍💼 Welcome Admin, {admin.name}
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="bg-white shadow-md border-l-4 border-primary p-4 rounded-xl">
          <p className="text-lg font-semibold">👥 Total Users</p>
          <p className="text-2xl font-bold text-primary">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-accent p-4 rounded-xl">
          <p className="text-lg font-semibold">🆕 New Users (7d)</p>
          <p className="text-2xl font-bold text-accent">{newUsers.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-success p-4 rounded-xl">
          <p className="text-lg font-semibold">🎁 Verified Donations</p>
          <p className="text-2xl font-bold text-success">{verifiedDonations.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-warning p-4 rounded-xl">
          <p className="text-lg font-semibold">⏳ Pending Donations</p>
          <p className="text-2xl font-bold text-warning">{pendingDonations.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-error p-4 rounded-xl">
          <p className="text-lg font-semibold">❌ Rejected Donations</p>
          <p className="text-2xl font-bold text-error">{rejectedDonations.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-secondary p-4 rounded-xl">
          <p className="text-lg font-semibold">📥 Requests</p>
          <p className="text-2xl font-bold text-secondary">{totalRequests}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-green-500 p-4 rounded-xl">
          <p className="text-lg font-semibold">✅ Accepted Requests</p>
          <p className="text-2xl font-bold text-green-500">{acceptedRequests.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-rose-500 p-4 rounded-xl">
          <p className="text-lg font-semibold">🚫 Rejected Requests</p>
          <p className="text-2xl font-bold text-rose-500">{rejectedRequests.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-indigo-500 p-4 rounded-xl">
          <p className="text-lg font-semibold">📦 Picked Up</p>
          <p className="text-2xl font-bold text-indigo-500">{pickedUpRequests.length}</p>
        </div>
        <div className="bg-white shadow-md border-l-4 border-cyan-500 p-4 rounded-xl">
          <p className="text-lg font-semibold">📝 Role Requests</p>
          <p className="text-2xl font-bold text-cyan-500">{roleRequests.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-primary">📄 Latest Registered Users</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {newUsers.slice(0, 5).map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge badge-outline badge-info capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td>{format(new Date(u.lastLoginAt), "PPPp")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;