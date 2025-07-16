import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Clock, MapPin } from 'lucide-react';
import FoodAnimation from '../LoadingAnimation/FoodLoading';

const getStatusClass = (status) => {
  switch (status) {
    case 'Available':
      return 'bg-success text-white text-xs px-3 py-1 rounded-full';
    case 'Requested':
      return 'bg-warning text-white text-xs px-3 py-1 rounded-full';
    case 'Picked Up':
      return 'bg-info text-white text-xs px-3 py-1 rounded-full';
    case 'Accepted':
      return 'bg-secondary text-white text-xs px-3 py-1 rounded-full';
    default:
      return 'bg-accent text-white text-xs px-3 py-1 rounded-full';
  }
};

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [showAll, setShowAll] = useState(false);

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/verified-donations');
      return res.data;
    }
  });

  if (isLoading) return <FoodAnimation></FoodAnimation>
  if (isError) return <div className="text-center text-red-500">Error loading donations</div>;

  const visibleDonations = showAll ? donations : donations.slice(0, 8);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Featured Donations
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover fresh surplus food from local restaurants ready for pickup by registered charities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDonations.map((item) => (
            <div
              key={item._id}
              className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/300'}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <span className={`absolute top-3 right-3 ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="inline-block mt-1 text-sm px-2 py-1 bg-primary/10 text-secondary rounded">
                    Food Donation
                  </span>
                </div>

                <div>
                  <div className="font-medium text-base-content">{item.restaurantName}</div>
                  <div className="flex items-center text-sm text-base-content/70">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-base-content">{item.quantity}</span>
                  <div className="flex items-center text-warning">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(item.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <Link
                  to={`/donation/${item._id}`}
                  className={`btn w-full ${item.status === 'Available' ? 'btn-accent' : 'btn-outline'}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {!showAll && donations.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-outline btn-lg px-8"
            >
              View All Donations
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllDonations;
