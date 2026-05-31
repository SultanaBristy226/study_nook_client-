import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/ui/Spinner';
import useTitle from '../hooks/useTitle';

export default function RegisterPage() {
  useTitle('Register');
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', photoURL: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(pwd)) return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(pwd)) return 'Password must include at least one lowercase letter.';
    return '';
  };

  const handlePasswordChange = (e) => {
    handle(e);
    setPwdError(validatePassword(e.target.value));
  };

  const submit = async e => {
    e.preventDefault();
    setError('');
    const pe = validatePassword(form.password);
    if (pe) { setPwdError(pe); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.photoURL);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleRegister = async () => {
    setError('');
    try {
      await loginWithGoogle();
      toast.success('Registered with Google!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">SN</span>
            </div>
          </Link>
          <h1 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-1">Create account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Start booking study rooms today</p>
        </div>

        <div className="card p-8">
          <button onClick={googleRegister}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-2.5 px-4 rounded-xl transition-all mb-6">
            <FcGoogle className="w-5 h-5" /> Continue with Google
          </button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-slate-800 px-3 text-xs text-slate-400">or fill in the form</span></div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-lg px-4 py-3">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handle} placeholder="Your name" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handle} placeholder="you@university.edu" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Photo URL</label>
              <input type="url" name="photoURL" value={form.photoURL} onChange={handle} placeholder="https://example.com/photo.jpg" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} name="password" required value={form.password} onChange={handlePasswordChange}
                  placeholder="Min 6 chars, upper & lowercase" className={`input-field pr-11 ${pwdError ? 'border-red-400 focus:ring-red-400' : ''}`} />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showPwd ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
              {pwdError && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{pwdError}</p>}
            </div>
            <button type="submit" disabled={loading || !!pwdError} className="btn-primary w-full justify-center py-2.5 mt-2">
              {loading ? <Spinner size="sm" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
