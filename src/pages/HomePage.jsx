import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiBookOpen, HiShieldCheck, HiLightningBolt } from 'react-icons/hi';
import api from '../lib/api';
import RoomCard from '../components/rooms/RoomCard';
import Spinner from '../components/ui/Spinner';
import useTitle from '../hooks/useTitle';

const STATS = [
  { label: 'Study Rooms', value: '500+' },
  { label: 'Active Users', value: '12K+' },
  { label: 'Universities', value: '80+' },
  { label: 'Bookings Done', value: '95K+' },
];

const FEATURES = [
  {
    icon: <HiBookOpen className="w-7 h-7 text-primary-600 dark:text-primary-400" />,
    title: 'Curated Study Spaces',
    desc: 'Every room is verified for silence, comfort and the amenities students actually need.',
  },
  {
    icon: <HiShieldCheck className="w-7 h-7 text-primary-600 dark:text-primary-400" />,
    title: 'Conflict-Free Booking',
    desc: 'Smart double-booking prevention so your reservation is always guaranteed.',
  },
  {
    icon: <HiLightningBolt className="w-7 h-7 text-primary-600 dark:text-primary-400" />,
    title: 'Instant Confirmation',
    desc: 'Book in under a minute. No email chains, no waiting for approval.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ayesha Rahman', role: 'Graduate Student, BUET',
    avatar: 'https://i.pravatar.cc/64?img=47',
    text: 'StudyNook saved my thesis defense prep. I had a private room booked within 30 seconds.',
  },
  {
    name: 'James Liu', role: 'Undergrad, MIT',
    avatar: 'https://i.pravatar.cc/64?img=11',
    text: 'I listed my department room and started earning. The platform is incredibly easy to manage.',
  },
  {
    name: 'Priya Singh', role: 'PhD Candidate, DU',
    avatar: 'https://i.pravatar.cc/64?img=26',
    text: 'The amenity filters are a lifesaver — projector + whiteboard combo found instantly.',
  },
];

export default function HomePage() {
  useTitle('Home');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms?limit=6')
      .then(r => setRooms(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section with Image - Dark/Light Mode Support */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-0"></div>
    <img 
      src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format" 
      alt="Study Room Background"
      className="w-full h-full object-cover"
    />
  </div>
  
  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10 backdrop-blur-sm">
        🎓 For students. By students.
      </span>
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
        Find Your Perfect<br />
        <span className="text-indigo-300 dark:text-indigo-400">Study Room</span>
      </h1>
      <p className="text-lg text-gray-200 dark:text-gray-300 max-w-xl mx-auto mb-10">
        Browse and book quiet, private study rooms in your library. List your own room and earn.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
              <Link to="/rooms" className="btn-primary text-base py-3 px-7 shadow-xl shadow-primary-900/50">
                Explore Rooms <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="btn-secondary text-base py-3 px-7 bg-white/10 border-white/20 text-white hover:bg-white/20">
                List Your Room
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl font-heading font-bold text-primary-600 dark:text-primary-400">{s.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Rooms */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-3">Available Study Rooms</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">The latest rooms added to our platform, ready for you to book right now.</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><Spinner size="lg" /></div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400">No rooms available yet. Be the first to list one!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => <RoomCard key={room._id} room={room} />)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/rooms" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-300 font-semibold">
              View All Rooms <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose StudyNook Section with Dark Mode */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose <span className="text-primary-600 dark:text-primary-400">StudyNook?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We provide the best platform for students to find and book study spaces
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 - Easy Search */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth="2"/>
                  <path d="M16 16L21 21" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Easy Search</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Find the perfect room with our advanced search filters by amenities, price, and location
              </p>
            </div>

            {/* Feature 2 - Instant Booking */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                  <path d="M8 2V6M16 2V6" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 10H21" strokeWidth="2"/>
                  <path d="M16 14L18 16L22 12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Booking</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Book your preferred time slot instantly with real-time availability checking
              </p>
            </div>

            {/* Feature 3 - Best Value */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth="2"/>
                  <path d="M12 8V12L14 14" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 16H12.01" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Best Value</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Competitive hourly rates with transparent pricing and no hidden fees
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-3">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={t.name} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.15 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900" />
                  <div>
                    <div className="font-semibold text-sm text-slate-800 dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to find your focus?</h2>
            <p className="text-primary-100 dark:text-primary-200 mb-8 text-lg">Join thousands of students who book smarter with StudyNook.</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary-700 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Get Started Free <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}