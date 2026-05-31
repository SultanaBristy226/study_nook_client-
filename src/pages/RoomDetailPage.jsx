import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiUsers, HiCurrencyDollar, HiCalendar, HiBookOpen } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import useTitle from '../hooks/useTitle';
import { dummyRooms } from '../data/rooms';

export default function RoomDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookModal, setBookModal] = useState(false);

  useTitle(room?.name || 'Room Details');

  useEffect(() => {
    const foundRoom = dummyRooms.find(r => r._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      navigate('/rooms');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/rooms" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
          ← Back to Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-64 md:h-80 object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop'; }} 
              />
              <div className="p-6">
                <h1 className="text-2xl font-heading font-bold text-slate-800 dark:text-white mb-4">
                  {room.name}
                </h1>

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

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                  {room.description}
                </p>

                {room.amenities?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map(a => (
                        <span key={a} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-heading font-bold text-primary-600 dark:text-primary-400">
                  ${room.hourlyRate}<span className="text-sm font-normal text-slate-500">/hr</span>
                </div>
              </div>
              {user ? (
                <button 
                  onClick={() => setBookModal(true)} 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
                >
                  <HiCalendar className="w-5 h-5" /> Book Now
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
                >
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={bookModal} onClose={() => setBookModal(false)} title="Book This Room" maxWidth="max-w-md">
        <p className="text-slate-600 dark:text-slate-300">Booking form coming soon...</p>
      </Modal>
    </div>
  );
}
