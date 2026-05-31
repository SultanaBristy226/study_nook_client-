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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #818cf8 0%, transparent 60%), radial-gradient(circle at 75% 20%, #fb923c 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10">
              🎓 For students. By students.
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Find Your Perfect<br />
              <span className="text-gradient">Study Room</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10">
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
            <h2 className="section-heading mb-3">Available Study Rooms</h2>
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
            <Link to="/rooms" className="btn-outline">View All Rooms <HiArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Why StudyNook */}
      <section className="py-20 bg-white dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Why StudyNook?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">We built the platform we always wished existed during our own study sessions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="card p-8 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {f.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-800 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="card p-6">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to find your focus?</h2>
            <p className="text-primary-200 mb-8 text-lg">Join thousands of students who book smarter with StudyNook.</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold py-3 px-8 rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
              Get Started Free <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
