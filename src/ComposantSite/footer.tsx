import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ArrowRight } from 'lucide-react';

/* ================== COULEURS ================== */
const COLOR_SCHEME = {
  primary: {
    dark: '#1a1a2e',
    medium: '#16213e',
    light: '#0f3460',
  },
  accent: {
    blue: '#3a86ff',
    cyan: '#00d9ff',
    purple: '#8338ec',
  },
  status: {
    success: '#06d6a0',
    warning: '#ffbe0b',
    error: '#ef476f',
  },
  neutral: {
    white: '#ffffff',
    gray900: '#0f172a',
    gray300: '#cbd5e1',
    gray400: '#94a3b8',
    gray500: '#64748b',
  },
};

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer
      className="text-gray-300 px-6 py-20 mt-32 shadow-inner relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${COLOR_SCHEME.primary.light} 0%, ${COLOR_SCHEME.primary.medium} 50%, ${COLOR_SCHEME.primary.dark} 100%)`,
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: COLOR_SCHEME.accent.blue }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: COLOR_SCHEME.accent.purple }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10"
      >
        {/* Logo & Description */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.purple})`,
              }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Ma
              <span
                style={{
                  background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.cyan})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bibliothèque
              </span>
            </h1>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: COLOR_SCHEME.neutral.gray400 }}
          >
            Accédez à des ouvrages enrichissants en toute simplicité. Livres religieux, spirituels, éducatifs disponibles partout, tout le temps.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: FaFacebookF, label: 'Facebook' },
              { icon: FaTwitter, label: 'Twitter' },
              { icon: FaInstagram, label: 'Instagram' },
              { icon: FaLinkedinIn, label: 'LinkedIn' },
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href="#"
                  title={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 group relative"
                  style={{
                    background: `${COLOR_SCHEME.accent.blue}20`,
                    border: `1px solid ${COLOR_SCHEME.accent.blue}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.purple})`;
                    e.currentTarget.style.border = `1px solid ${COLOR_SCHEME.accent.blue}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${COLOR_SCHEME.accent.blue}20`;
                    e.currentTarget.style.border = `1px solid ${COLOR_SCHEME.accent.blue}40`;
                  }}
                >
                  <Icon className="text-white text-sm" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <div
              className="w-1 h-5 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.cyan})`,
              }}
            />
            Navigation
          </h2>
          <ul className="space-y-3 text-sm">
            {['Accueil', 'Livres', 'À propos', 'Contact'].map((item, i) => (
              <li key={i}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="transition-all duration-300 group flex items-center gap-2"
                  style={{ color: COLOR_SCHEME.neutral.gray400 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLOR_SCHEME.accent.cyan;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = COLOR_SCHEME.neutral.gray400;
                  }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Liens Utiles */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <div
              className="w-1 h-5 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${COLOR_SCHEME.accent.purple}, ${COLOR_SCHEME.accent.blue})`,
              }}
            />
            Utiles
          </h2>
          <ul className="space-y-3 text-sm">
            {['Conditions', 'Confidentialité', 'FAQ'].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="transition-all duration-300 group flex items-center gap-2"
                  style={{ color: COLOR_SCHEME.neutral.gray400 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLOR_SCHEME.accent.cyan;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = COLOR_SCHEME.neutral.gray400;
                  }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <div
              className="w-1 h-5 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${COLOR_SCHEME.accent.cyan}, ${COLOR_SCHEME.accent.purple})`,
              }}
            />
            Newsletter
          </h2>
          <p
            className="text-sm mb-4"
            style={{ color: COLOR_SCHEME.neutral.gray400 }}
          >
            Recevez les dernières nouveautés directement par email.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            <div className="relative group">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors pointer-events-none"
                style={{
                  color: COLOR_SCHEME.accent.blue,
                }}
              />
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full pl-10 pr-4 py-2 rounded-lg text-white placeholder-gray-500 border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  background: `${COLOR_SCHEME.primary.dark}80`,
                  borderColor: `${COLOR_SCHEME.accent.blue}40`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLOR_SCHEME.accent.blue;
                  e.currentTarget.style.background = `${COLOR_SCHEME.primary.dark}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = `${COLOR_SCHEME.accent.blue}40`;
                  e.currentTarget.style.background = `${COLOR_SCHEME.primary.dark}80`;
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
              style={{
                background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.purple})`,
                boxShadow: `0 8px 24px ${COLOR_SCHEME.accent.blue}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 32px ${COLOR_SCHEME.accent.blue}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${COLOR_SCHEME.accent.blue}30`;
              }}
            >
              S'abonner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Bas de page */}
      <motion.div
        variants={itemVariants}
        className="mt-14 border-t pt-6 text-center text-sm relative z-10"
        style={{
          borderColor: `${COLOR_SCHEME.accent.blue}30`,
          color: COLOR_SCHEME.neutral.gray500,
        }}
      >
        <p>
          © {new Date().getFullYear()}{' '}
          <span
            style={{
              color: COLOR_SCHEME.neutral.white,
              fontWeight: 'bold',
            }}
          >
            MaBibliothèque
          </span>
          . Tous droits réservés.
        </p>
      </motion.div>

      {/* Style global */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .group:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;