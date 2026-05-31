import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../lib/api';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import useTitle from '../hooks/useTitle';

