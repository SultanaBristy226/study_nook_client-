import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiUsers, HiCurrencyDollar, HiCalendar, HiPencil, HiTrash, HiBookOpen } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import useTitle from '../hooks/useTitle';

const HOURS = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);
const AMENITY_COLORS = {
  'Whiteboard': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Projector': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Wi-Fi': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Power Outlets': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Quiet Zone': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'Air Conditioning': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
};

function BookingForm({ room, onSuccess }) {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const endOptions = startTime ? HOURS.filter(h => h > startTime) : [];
  const hours = startTime && endTime ? parseInt(endTime) - parseInt(startTime) : 0;
  const totalCost = hours * room.hourlyRate;

  const handleBook = async () => {
    if (!date || !startTime || !endTime) { toast.error('Please fill in all booking details.'); return; }
    setSubmitting(true);
    try {
      const dateStr = date.toISOString().split('T')[0];
      await api.post('/bookings', { roomId: room._id, date: dateStr, startTime, endTime, totalCost, specialNote: note });
      toast.success('Room booked successfully!');
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Date</label>
        <DatePicker selected={date} onChange={setDate} minDate={new Date()} placeholderText="Select a date"
          className="input-field w-full" dateFormat="yyyy-MM-dd" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Start Time</label>
          <select value={startTime} onChange={e => { setStartTime(e.target.value); setEndTime(''); }} className="input-field">
            <option value="">Select</option>
            {HOURS.slice(0, -1).map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">End Time</label>
          <select value={endTime} onChange={e => setEndTime(e.target.value)} className="input-field" disabled={!startTime}>
            <option value="">Select</option>
            {endOptions.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>
      {hours > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-300">{hours} hour{hours > 1 ? 's' : ''} × ${room.hourlyRate}/hr</span>
          <span className="text-xl font-bold font-heading text-primary-600 dark:text-primary-400">${totalCost}</span>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Special Note (optional)</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Any special requirements..." className="input-field" />
      </div>
      <button onClick={handleBook} disabled={submitting || !date || !startTime || !endTime} className="btn-primary w-full justify-center py-3">
        {submitting ? <Spinner size="sm" /> : 'Confirm Booking'}
      </button>
    </div>
  );
}

function EditRoomModal({ room, onClose, onUpdated }) {
  const AMENITY_OPTIONS = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];
  const [form, setForm] = useState({ ...room, amenities: room.amenities || [] });
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const toggleAmenity = a => setForm(p => ({
    ...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]
  }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put(`/rooms/${room._id}`, form);
      toast.success('Room updated successfully');
      onUpdated(data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {[['name', 'Room Name', 'text'], ['image', 'Image URL', 'url'], ['floor', 'Floor', 'text']].map(([name, label, type]) => (
        <div key={name}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">{label}</label>
          <input type={type} name={name} required value={form[name] || ''} onChange={handle} className="input-field" />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Capacity</label>
          <input type="number" name="capacity" required value={form.capacity || ''} onChange={handle} className="input-field" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Hourly Rate ($)</label>
          <input type="number" name="hourlyRate" required value={form.hourlyRate || ''} onChange={handle} className="input-field" min="1" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Description</label>
        <textarea name="description" required value={form.description || ''} onChange={handle} rows={3} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map(a => (
            <button type="button" key={a} onClick={() => toggleAmenity(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.amenities.includes(a) ? 'bg-primary-600 text-white border-primary-600' : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'}`}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
        {loading ? <Spinner size="sm" /> : 'Save Changes'}
      </button>
    </form>
  );
}

export default function RoomDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookModal, setBookModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useTitle(room?.name || 'Room Details');

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then(r => setRoom(r.data))
      .catch(() => navigate('/rooms'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const isOwner = user && room && (room.owner?._id === user._id || room.owner === user._id);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted successfully');
      navigate('/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  if (!room) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/rooms" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
          ← Back to Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-64 md:h-80 object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop'; }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-slate-800 dark:text-white">{room.name}</h1>
                    <div className="flex items-center gap-1 mt-1 text-sm text-slate-500 dark:text-slate-400">
                      <HiBookOpen className="w-4 h-4 text-primary-500" />
                      <span>{room.bookingCount} bookings</span>
                    </div>
                  </div>
                  {isOwner && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setEditModal(true)} className="btn-secondary text-sm py-1.5 px-3 gap-1.5">
                        <HiPencil className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => setDeleteModal(true)} className="btn-danger text-sm py-1.5 px-3 gap-1.5">
                        <HiTrash className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-slate-700 mb-4">
                  <div className="text-center">
                    <HiLocationMarker className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 dark:text-slate-400">Floor</div>
                    <div className="font-semibold text-sm text-slate-700 dark:text-slate-200">{room.floor}</div>
                  </div>
                  <div className="text-center">
                    <HiUsers className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 dark:text-slate-400">Capacity</div>
                    <div className="font-semibold text-sm text-slate-700 dark:text-slate-200">{room.capacity} people</div>
                  </div>
                  <div className="text-center">
                    <HiCurrencyDollar className="w-5 h-5 text-accent-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500 dark:text-slate-400">Rate</div>
                    <div className="font-semibold text-sm text-slate-700 dark:text-slate-200">${room.hourlyRate}/hr</div>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">{room.description}</p>

                {room.amenities?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map(a => (
                        <span key={a} className={`badge ${AMENITY_COLORS[a] || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>{a}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-heading font-bold text-primary-600 dark:text-primary-400">${room.hourlyRate}<span className="text-sm font-normal text-slate-500">/hr</span></div>
              </div>
              {user ? (
                <button onClick={() => setBookModal(true)} className="btn-primary w-full justify-center py-3 text-base">
                  <HiCalendar className="w-5 h-5" /> Book Now
                </button>
              ) : (
                <Link to="/login" state={{ from: { pathname: `/rooms/${id}` } }} className="btn-primary w-full justify-center py-3 text-base">
                  Login to Book
                </Link>
              )}
              {room.ownerName && (
                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Listed by</p>
                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{room.ownerName}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal isOpen={bookModal} onClose={() => setBookModal(false)} title="Book This Room" maxWidth="max-w-md">
        <BookingForm room={room} onSuccess={() => { setBookModal(false); setRoom(r => ({ ...r, bookingCount: r.bookingCount + 1 })); }} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Room" maxWidth="max-w-xl">
        <EditRoomModal room={room} onClose={() => setEditModal(false)} onUpdated={setRoom} />
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Room" maxWidth="max-w-sm">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">Are you sure you want to permanently delete <strong>{room.name}</strong>? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={handleDelete} disabled={deleting} className="btn-danger flex-1 justify-center">
            {deleting ? <Spinner size="sm" /> : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
