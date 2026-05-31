import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../lib/api';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import useTitle from '../hooks/useTitle';

export default function MyBookingsPage() {
  useTitle('My Bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    api.get('/bookings/my-bookings')
      .then(r => setBookings(r.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await api.patch(`/bookings/${cancelTarget._id}/cancel`);
      toast.success('Booking cancelled');
      setBookings(prev => prev.map(b => b._id === cancelTarget._id ? { ...b, status: 'cancelled' } : b));
      setCancelTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    } finally {
      setCancelling(false);
    }
  };

  const isFuture = (dateStr) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(dateStr) >= today;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-1">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>

        {bookings.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-heading font-semibold text-slate-700 dark:text-slate-200 mb-2">No bookings yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Browse available rooms and book your first study session.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div key={b._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Room image */}
                  {b.room?.image && (
                    <div className="sm:w-36 h-32 sm:h-auto flex-shrink-0">
                      <img src={b.room.image} alt={b.room.name} className="w-full h-full object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=200&h=150&fit=crop'; }} />
                    </div>
                  )}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-heading font-semibold text-base text-slate-800 dark:text-white truncate">{b.room?.name || 'Room'}</h3>
                        <span className={`badge text-xs ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <HiCalendar className="w-3.5 h-3.5 text-primary-500" />{b.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <HiClock className="w-3.5 h-3.5 text-primary-500" />{b.startTime} – {b.endTime}
                        </span>
                        {b.room?.floor && (
                          <span className="flex items-center gap-1.5">
                            <HiLocationMarker className="w-3.5 h-3.5 text-primary-500" />{b.room.floor}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <HiCurrencyDollar className="w-3.5 h-3.5 text-accent-500" />
                          <span className="font-semibold text-slate-700 dark:text-slate-200">${b.totalCost}</span>
                        </span>
                      </div>

                      {b.specialNote && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic">"{b.specialNote}"</p>
                      )}
                    </div>

                    {b.status === 'confirmed' && isFuture(b.date) && (
                      <button onClick={() => setCancelTarget(b)} className="btn-danger text-sm py-2 px-4 flex-shrink-0">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!cancelTarget} onClose={() => setCancelTarget(null)} title="Cancel Booking" maxWidth="max-w-sm">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
          Are you sure you want to cancel your booking for <strong>{cancelTarget?.room?.name}</strong>?
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
          {cancelTarget?.date} from {cancelTarget?.startTime} to {cancelTarget?.endTime}
        </p>
        <div className="flex gap-3">
          <button onClick={() => setCancelTarget(null)} className="btn-secondary flex-1 justify-center">Keep Booking</button>
          <button onClick={handleCancel} disabled={cancelling} className="btn-danger flex-1 justify-center">
            {cancelling ? <Spinner size="sm" /> : 'Cancel Booking'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
