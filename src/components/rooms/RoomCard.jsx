import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiUsers, HiCurrencyDollar } from 'react-icons/hi';

const AMENITY_COLORS = {
  'Whiteboard': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Projector': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Wi-Fi': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Power Outlets': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Quiet Zone': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'Air Conditioning': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
};

export default function RoomCard({ room }) {
  const visibleAmenities = room.amenities?.slice(0, 3) || [];
  const extraCount = (room.amenities?.length || 0) - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card flex flex-col h-full overflow-hidden group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop'; }}
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400">
          ${room.hourlyRate}/hr
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-base text-slate-800 dark:text-white mb-1 line-clamp-1">{room.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
          {room.description?.substring(0, 100)}{room.description?.length > 100 ? '…' : ''}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><HiLocationMarker className="w-3.5 h-3.5 text-primary-500" />{room.floor}</span>
            <span className="flex items-center gap-1"><HiUsers className="w-3.5 h-3.5 text-primary-500" />{room.capacity} people</span>
            <span className="flex items-center gap-1"><HiCurrencyDollar className="w-3.5 h-3.5 text-accent-500" />${room.hourlyRate}/hr</span>
          </div>

          {visibleAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {visibleAmenities.map(a => (
                <span key={a} className={`badge text-xs ${AMENITY_COLORS[a] || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                  {a}
                </span>
              ))}
              {extraCount > 0 && (
                <span className="badge bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">+{extraCount} more</span>
              )}
            </div>
          )}
        </div>

        <Link to={`/rooms/${room._id}`} className="btn-primary w-full justify-center text-sm py-2">
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
