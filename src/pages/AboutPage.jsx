import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiUsers, HiBookOpen, HiGlobeAlt, HiHeart, HiLightBulb } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';  

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #ffffff 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              About <span className="text-indigo-200">StudyNook</span>
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              We're on a mission to make study spaces accessible, affordable, and easy to book for every student.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-primary-600 rounded-full mb-6"></div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                StudyNook was born from a simple observation - students everywhere struggle to find quiet, 
                comfortable study spaces on campus. Libraries fill up fast, coffee shops are too noisy, 
                and dorm rooms are full of distractions.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                In 2024, a group of university students decided to solve this problem. We created a platform 
                that connects students with available study rooms - making it easy to find, book, and reserve 
                your perfect study spot in seconds.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Today, StudyNook serves thousands of students across multiple universities, and we're just 
                getting started!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format"
                  alt="Students studying"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              Our Mission & Vision
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Guiding our every decision and feature
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <HiGlobeAlt className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400">
                To empower students by providing seamless access to quality study spaces, 
                enabling focused learning and academic success.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <HiLightBulb className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A world where every student can find their perfect study environment, 
                anytime, anywhere, without stress or hassle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              Our Core Values
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that drive everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <HiUsers className="w-8 h-8" />,
                title: "Student First",
                desc: "Every feature we build starts with student needs"
              },
              {
                icon: <HiHeart className="w-8 h-8" />,
                title: "Community Driven",
                desc: "We grow and learn from our user community"
              },
              {
                icon: <FaTrophy className="w-8 h-8" />,  
                title: "Excellence",
                desc: "We strive for the best in everything we do"
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Join StudyNook?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Be part of a growing community of focused students
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary-700 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Get Started Free
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}