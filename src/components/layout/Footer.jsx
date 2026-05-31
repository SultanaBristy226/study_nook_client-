import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiPhone } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SN</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">StudyNook</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your go-to platform for booking quiet, focused study rooms in university libraries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['Home', '/'], ['Rooms', '/rooms'], ['About', '/about']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-slate-400 hover:text-primary-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <HiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>support@studynook.app</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <HiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+1 (555) 012-3456</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebook, href: '#', label: 'Facebook' },
                { Icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
                { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                { Icon: FaInstagram, href: '#', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} StudyNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}