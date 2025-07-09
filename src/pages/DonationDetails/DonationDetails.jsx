import { useParams } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Clock, MapPin, User, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DonationDetails = () => {
  const { id } = useParams();
  console.log(id)
  const axiosSecure = useAxiosSecure();
  const [pickupTime, setPickupTime] = useState('');
  const [description, setDescription] = useState('');

  const { data: donation, isLoading, isError } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    }
  });

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post('/favorites', { donationId: id });
    },
    onSuccess: () => toast.success('Added to favorites!'),
    onError: () => toast.error('Failed to add to favorites.')
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post('/donation-requests', {
        donationId: id,
        description,
        pickupTime
      });
    },
    onSuccess: () => toast.success('Request submitted!'),
    onError: () => toast.error('Failed to submit request.')
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError || !donation) return <div className="text-center text-red-500">Error loading donation</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
      <img
        src={donation.imageUrl || 'https://via.placeholder.com/600x300'}
        className="w-full h-60 object-cover rounded-lg mb-4"
        alt={donation.title}
      />
      <h2 className="text-2xl font-bold mb-2 text-primary">{donation.title}</h2>
      <p className="text-base-content/80 mb-4">{donation.description}</p>

      <div className="grid gap-3 text-base-content/90">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" /> {donation.restaurantName}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {donation.location}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> {new Date(donation.pickupTime).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Quantity:</span> {donation.quantity}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {donation.status}
        </div>
        {donation.charityName && (
          <div>
            <span className="font-semibold">Assigned to:</span> {donation.charityName}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={() => favoriteMutation.mutate()}
          className="btn btn-outline btn-primary w-full"
        >
          <Heart className="w-4 h-4 mr-2" /> Save to Favorites
        </button>

        <button
          className="btn btn-secondary w-full"
          onClick={() => document.getElementById('request_modal').showModal()}
        >
          <ShoppingBag className="w-4 h-4 mr-2" /> Request Pickup
        </button>
      </div>

      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request Donation</h3>
          <p className="text-sm text-base-content/70 mb-4">Fill out the pickup details</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            requestMutation.mutate();
            document.getElementById('request_modal').close();
          }} className="space-y-4">
            <input type="text" readOnly value={donation.title} className="input input-bordered w-full" />
            <input type="text" readOnly value={donation.restaurantName} className="input input-bordered w-full" />
            <input type="text" placeholder="Pickup Time (e.g. 2025-07-10 16:00)" required className="input input-bordered w-full" onChange={(e) => setPickupTime(e.target.value)} />
            <textarea className="textarea textarea-bordered w-full" required placeholder="Why do you need this?" onChange={(e) => setDescription(e.target.value)}></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-success">Submit</button>
              <button type="button" onClick={() => document.getElementById('request_modal').close()} className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;
