import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiFilter, HiX } from 'react-icons/hi';
import api from '../lib/api';
import RoomCard from '../components/rooms/RoomCard';
import Spinner from '../components/ui/Spinner';
import useTitle from '../hooks/useTitle';

const AMENITY_OPTIONS = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];

export default function RoomsPage() {
  useTitle('Available Rooms');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedAmenities.length) params.set('amenities', selectedAmenities.join(','));
      if (minRate) params.set('minRate', minRate);
      if (maxRate) params.set('maxRate', maxRate);
      const { data } = await api.get(`/rooms?${params}`);
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [search, selectedAmenities, minRate, maxRate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRooms();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchRooms]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setMinRate('');
    setMaxRate('');
  };

  const hasFilters = search || selectedAmenities.length > 0 || minRate || maxRate;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-3"
          >
            All Study Rooms
          </motion.h1>
          <p className="text-slate-300 text-base">
            Search, filter, and book the perfect room for your study session.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search rooms by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
              showFilters ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <HiFilter className="w-4 h-4" />
            Filters {hasFilters ? `(${selectedAmenities.length + (minRate ? 1 : 0) + (maxRate ? 1 : 0)})` : ''}
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <HiX className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 mb-6 shadow-md border border-slate-100 dark:border-slate-700"
          >
            <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {AMENITY_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedAmenities.includes(amenity)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-400'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
            <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-3">Hourly Rate ($)</h4>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                className="w-28 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                className="w-28 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                min="0"
              />
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold text-slate-700 dark:text-slate-200 mb-2">
              No rooms found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {rooms.length} room{rooms.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}