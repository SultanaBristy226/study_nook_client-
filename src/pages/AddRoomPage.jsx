import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../lib/api';
import Spinner from '../components/ui/Spinner';
import useTitle from '../hooks/useTitle';

const AMENITY_OPTIONS = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];

export default function AddRoomPage() {
  useTitle('Add Room');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', image: '', floor: '',
    capacity: '', hourlyRate: '', amenities: [],
  });
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const toggleAmenity = a => setForm(p => ({
    ...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]
  }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/rooms', form);
      toast.success('Room added successfully!');
      navigate('/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-2">Add a Study Room</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">List your room and let students book it seamlessly.</p>
          </div>

          <div className="card p-8">
            <form onSubmit={submit} className="space-y-5">
              {/* Room Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Room Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" required value={form.name} onChange={handle} placeholder="e.g. Quiet Corner Room A3" className="input-field" />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                  <span className="flex items-center gap-1.5"><HiPhotograph className="w-4 h-4" />Image URL <span className="text-red-500">*</span></span>
                </label>
                <input type="url" name="image" required value={form.image} onChange={handle}
                  placeholder="https://example.com/room-photo.jpg" className="input-field" />
                {form.image && (
                  <div className="mt-2 rounded-xl overflow-hidden h-32">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea name="description" required value={form.description} onChange={handle} rows={4}
                  placeholder="Describe the room, its atmosphere, nearby facilities..." className="input-field" />
              </div>

              {/* Floor + Capacity + Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Floor <span className="text-red-500">*</span></label>
                  <input type="text" name="floor" required value={form.floor} onChange={handle} placeholder="e.g. 3rd Floor" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Capacity <span className="text-red-500">*</span></label>
                  <input type="number" name="capacity" required value={form.capacity} onChange={handle} placeholder="4" min="1" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Rate ($/hr) <span className="text-red-500">*</span></label>
                  <input type="number" name="hourlyRate" required value={form.hourlyRate} onChange={handle} placeholder="5" min="1" className="input-field" />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AMENITY_OPTIONS.map(a => (
                    <label key={a} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      form.amenities.includes(a)
                        ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-400 dark:border-primary-500'
                        : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                    }`}>
                      <input type="checkbox" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} className="accent-primary-600" />
                      <span className="text-sm text-slate-700 dark:text-slate-200">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base mt-2">
                {loading ? <Spinner size="sm" /> : 'Add Room'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
