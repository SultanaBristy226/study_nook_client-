import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiBookOpen } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../lib/api';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import useTitle from '../hooks/useTitle';

export default function MyListingsPage() {
  useTitle('My Listings');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRooms = () => {
    setLoading(true);
    api.get('/rooms/my-rooms')
      .then(r => setRooms(r.data))
      .catch(() => toast.error('Failed to load listings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/rooms/${deleteTarget._id}`);
      toast.success('Room deleted successfully');
      setRooms(prev => prev.filter(r => r._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-1">My Listings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{rooms.length} room{rooms.length !== 1 ? 's' : ''} listed</p>
          </div>
          <Link to="/add-room" className="btn-primary gap-2">
            <HiPlus className="w-5 h-5" /> Add Room
          </Link>
        </div>

        {rooms.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-heading font-semibold text-slate-700 dark:text-slate-200 mb-2">No listings yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Start earning by listing your first study room.</p>
            <Link to="/add-room" className="btn-primary">Add Your First Room</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map((room, i) => (
              <motion.div key={room._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="card overflow-hidden flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=200&fit=crop'; }} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-base text-slate-800 dark:text-white line-clamp-1">{room.name}</h3>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400 flex-shrink-0">${room.hourlyRate}/hr</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{room.floor} · {room.capacity} people</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <HiBookOpen className="w-3.5 h-3.5 text-primary-500" />
                    <span>{room.bookingCount} booking{room.bookingCount !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link to={`/rooms/${room._id}`} className="btn-secondary flex-1 justify-center text-sm py-2">View</Link>
                    <button onClick={() => setDeleteTarget(room)} className="btn-danger flex-1 justify-center text-sm py-2 gap-1">
                      <HiTrash className="w-4 h-4" />Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Room" maxWidth="max-w-sm">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={handleDelete} disabled={deleting} className="btn-danger flex-1 justify-center">
            {deleting ? <Spinner size="sm" /> : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
