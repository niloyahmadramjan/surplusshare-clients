import { MapPin, Clock } from "lucide-react";

const FeaturedDonations = () => {
  const donations = [
    {
      id: 1,
      title: "Fresh Bakery Items",
      foodType: "Bakery",
      restaurant: "Golden Crust Bakery",
      location: "Downtown District",
      status: "Available",
      quantity: "50 items",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
      timeLeft: "2 hours left",
    },
    {
      id: 2,
      title: "Fresh Produce Surplus",
      foodType: "Produce",
      restaurant: "Green Market Café",
      location: "Uptown Plaza",
      status: "Available",
      quantity: "15 kg",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
      timeLeft: "4 hours left",
    },
    {
      id: 3,
      title: "Prepared Meals",
      foodType: "Ready Meals",
      restaurant: "Bistro Central",
      location: "City Center",
      status: "Requested",
      quantity: "30 portions",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      timeLeft: "1 hour left",
    },
    {
      id: 4,
      title: "Dairy Products",
      foodType: "Dairy",
      restaurant: "Farm Fresh Deli",
      location: "Riverside Area",
      status: "Available",
      quantity: "25 items",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
      timeLeft: "6 hours left",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "badge badge-success";
      case "Requested":
        return "badge badge-warning";
      case "Picked Up":
        return "badge badge-neutral";
      default:
        return "badge badge-neutral";
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Donations
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover fresh surplus food from local restaurants ready for pickup by registered charities.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donations.map((item) => (
            <div
              key={item.id}
              className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <span className={`absolute top-3 right-3 ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Title + Type */}
                <div>
                  <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="inline-block mt-1 text-sm px-2 py-1 bg-primary/10 text-secondary rounded">
                    {item.foodType}
                  </span>
                </div>

                {/* Restaurant & Location */}
                <div>
                  <div className="font-medium text-base-content">{item.restaurant}</div>
                  <div className="flex items-center text-sm text-base-content/70">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                </div>

                {/* Quantity & Time Left */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-base-content">{item.quantity}</span>
                  <div className="flex items-center text-warning">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.timeLeft}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`btn w-full ${
                    item.status === "Available" ? "btn-accent" : "btn-outline"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn btn-outline btn-lg px-8">View All Donations</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;
