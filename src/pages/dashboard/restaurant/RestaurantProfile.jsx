import { format } from "date-fns";

const RestaurantProfile = () => {
  const restaurant = {
    name: "Spice Kingdom",
    logo: "https://i.ibb.co/jpr0n2L/Web-Developer-skill-1200x682.jpg",
    role: "Restaurant",
    address: "Dhanmondi, Dhaka, Bangladesh",
    contact: "+8801712345678",
    registeredAt: "2025-07-08T17:00:00.000Z",
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Restaurant Profile</h2>

      <div className="card lg:card-side bg-base-100 shadow-md border border-gray-200">
        <figure className="w-full lg:w-1/3 p-4">
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="rounded-xl object-cover w-full h-48 lg:h-60"
          />
        </figure>

        <div className="card-body w-full lg:w-2/3">
          <h2 className="text-xl md:text-2xl font-semibold">
            {restaurant.name}
          </h2>
          <p className="text-sm text-gray-500">
            <strong>Role:</strong>{" "}
            <span className="badge badge-info text-white">
              {restaurant.role}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {restaurant.address}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Contact:</strong> {restaurant.contact}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Registered On:</strong>{" "}
            {restaurant.registeredAt
              ? format(new Date(restaurant.registeredAt), "PPP")
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
