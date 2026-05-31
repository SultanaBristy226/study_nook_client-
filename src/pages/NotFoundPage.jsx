import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi';
import useTitle from '../hooks/useTitle';

export default function NotFoundPage() {
  useTitle('404 – Page Not Found');
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-heading font-bold text-gradient mb-4">404</div>
        <h1 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-3">Page not found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary gap-2 text-base py-3 px-7">
          <HiHome className="w-5 h-5" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
