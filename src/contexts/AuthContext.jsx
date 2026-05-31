import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password, photoURL) => {
    const { data } = await api.post('/auth/register', { name, email, password, photoURL });
    return data;
  };

  const loginWithGoogle = async () => {
    let result;
    try {
      result = await signInWithPopup(auth, googleProvider);
    } catch (firebaseErr) {
      const code = firebaseErr.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        throw new Error('Google sign-in was cancelled. Please try again.');
      }
      if (code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by your browser. Please allow popups for this site and try again.');
      }
      throw new Error(firebaseErr.message || 'Google sign-in failed. Check your Firebase configuration.');
    }
    const { displayName: name, email, photoURL } = result.user;
    try {
      const { data } = await api.post('/auth/google', { name, email, photoURL });
      setUser(data.user);
      return data;
    } catch (apiErr) {
      throw new Error(apiErr.response?.data?.message || 'Server error during Google login. Make sure the backend server is running.');
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    try { await signOut(auth); } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
