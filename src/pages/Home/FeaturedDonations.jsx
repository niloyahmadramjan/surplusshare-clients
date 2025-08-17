import { useQuery } from '@tanstack/react-query'
import { MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import FoodAnimation from '../LoadingAnimation/FoodLoading'
import useAuth from '../../hooks/useAuth'

const FeaturedDonations = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verified-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/verified-donations')
      return res.data
    },
  })

  const latestDonations = donations.slice(0, 6)

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'badge badge-success'
      case 'Requested':
        return 'badge badge-warning'
      case 'Picked Up':
        return 'badge badge-neutral'
      default:
        return 'badge badge-neutral'
    }
  }

  // console.log(latestDonations);

  if (isLoading) return <FoodAnimation />

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Featured Donations
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover fresh surplus food from local restaurants ready for pickup
            by registered charities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user
            ? latestDonations.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="inline-block mt-1 text-sm px-2 py-1 bg-blue-100 text-blue-600 rounded">
                        {item.foodType}
                      </span>
                    </div>

                    <div>
                      <div className="font-medium text-gray-700">
                        {item.restaurantName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-800">
                        Qty: {item.quantity}
                      </span>
                      <div className="flex items-center text-warning">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.pickupTime?.slice(11, 16) || 'Time'}
                      </div>
                    </div>

                    <Link
                      to={`/donation/${item._id}`}
                      className={`btn w-full ${
                        item.status === 'Available'
                          ? 'btn-accent'
                          : 'btn-outline'
                      }`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-base-200 h-80 rounded-xl blur-sm opacity-60 pointer-events-none shadow-inner"
                ></div>
              ))}
        </div>

        {/* View All or CTA */}
        <div className="text-center mt-12">
          {user ? (
            <Link to="/donations" className="btn btn-outline btn-lg px-8">
              View All Donations
            </Link>
          ) : (
            <Link to="/login" className="btn btn-accent btn-lg px-8">
              Login or Register to View
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedDonations
