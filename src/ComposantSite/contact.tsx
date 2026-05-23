import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    gray600: '#475569',
  },
};

interface FormData {
  nom: string;
  email: string;
  message: string;
}

interface ContactState {
  isSubmitting: boolean;
  isSuccess: boolean;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    message: '',
  });

  const [state, setState] = useState<ContactState>({
    isSubmitting: false,
    isSuccess: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ isSubmitting: true, isSuccess: false });

    // Simuler l'envoi
    setTimeout(() => {
      setState({ isSubmitting: false, isSuccess: true });
      setFormData({ nom: '', email: '', message: '' });

      // Reset le message de succès après 5s
      setTimeout(() => {
        setState({ isSubmitting: false, isSuccess: false });
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLOR_SCHEME.primary.dark} 0%, ${COLOR_SCHEME.primary.medium} 50%, ${COLOR_SCHEME.primary.light} 100%)`,
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{ background: COLOR_SCHEME.accent.blue }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{
            background: COLOR_SCHEME.accent.purple,
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: COLOR_SCHEME.accent.cyan }}
        />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl flex flex-col lg:flex-row"
        style={{
          background: `${COLOR_SCHEME.neutral.white}`,
          boxShadow: `0 20px 60px ${COLOR_SCHEME.accent.blue}30`,
        }}
      >
        {/* Left side: Contact Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:w-1/2 w-full flex flex-col justify-center p-10 md:p-14 relative"
          style={{
            background: `linear-gradient(135deg, ${COLOR_SCHEME.primary.dark}, ${COLOR_SCHEME.primary.medium})`,
            borderRight: `2px solid ${COLOR_SCHEME.accent.blue}20`,
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-10 right-10 w-20 h-20 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.cyan})`,
            }}
          />
          <div
            className="absolute bottom-10 left-10 w-16 h-16 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.purple}, ${COLOR_SCHEME.accent.blue})`,
            }}
          />

          <div className="relative z-10 space-y-8">
            <div>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: COLOR_SCHEME.neutral.white }}
              >
                Entrons en
              </h2>
              <h2
                className="text-4xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.cyan})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                contact
              </h2>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ color: COLOR_SCHEME.neutral.gray300 }}
            >
              Avez-vous une question ou une suggestion ? N'hésitez pas à nous écrire. Nous vous répondrons rapidement et avec plaisir.
            </p>

            {/* Contact items */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: 'Adresse',
                  value: 'Dakar, Sénégal',
                  color: COLOR_SCHEME.accent.blue,
                },
                {
                  icon: Phone,
                  label: 'Téléphone',
                  value: '+221 77 123 45 67',
                  color: COLOR_SCHEME.accent.cyan,
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'contact@mabibliothèque.com',
                  color: COLOR_SCHEME.accent.purple,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="p-3 rounded-lg flex-shrink-0 transition-all duration-300"
                      style={{
                        background: `${item.color}20`,
                        borderLeft: `3px solid ${item.color}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-1"
                        style={{ color: COLOR_SCHEME.neutral.gray400 }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-medium"
                        style={{ color: COLOR_SCHEME.neutral.white }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Image - responsive */}
            <div className="mt-8 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-150784272343-583f20270319?w=400&h=300&fit=crop"
                alt="Bibliothèque"
                className="rounded-2xl shadow-lg w-full object-cover"
                style={{
                  border: `2px solid ${COLOR_SCHEME.accent.blue}30`,
                  aspectRatio: '4/3',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right side: Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="lg:w-1/2 w-full p-10 md:p-14 flex flex-col justify-center"
        >
          <h3
            className="text-3xl font-bold mb-8"
            style={{ color: COLOR_SCHEME.primary.dark }}
          >
            Formulaire de contact
          </h3>

          {state.isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-4 py-12"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${COLOR_SCHEME.status.success}, ${COLOR_SCHEME.accent.cyan})`,
                }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4
                className="text-2xl font-bold"
                style={{ color: COLOR_SCHEME.primary.dark }}
              >
                Merci !
              </h4>
              <p
                className="text-center"
                style={{ color: COLOR_SCHEME.neutral.gray600 }}
              >
                Votre message a été envoyé avec succès. Nous vous répondrons très bientôt.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: COLOR_SCHEME.neutral.gray600 }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: COLOR_SCHEME.neutral.gray300,
                    background: COLOR_SCHEME.neutral.white,
                    color: COLOR_SCHEME.primary.dark,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLOR_SCHEME.accent.blue;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${COLOR_SCHEME.accent.blue}15`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      COLOR_SCHEME.neutral.gray300;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: COLOR_SCHEME.neutral.gray600 }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: COLOR_SCHEME.neutral.gray300,
                    background: COLOR_SCHEME.neutral.white,
                    color: COLOR_SCHEME.primary.dark,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLOR_SCHEME.accent.blue;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${COLOR_SCHEME.accent.blue}15`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      COLOR_SCHEME.neutral.gray300;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: COLOR_SCHEME.neutral.gray600 }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none"
                  style={{
                    borderColor: COLOR_SCHEME.neutral.gray300,
                    background: COLOR_SCHEME.neutral.white,
                    color: COLOR_SCHEME.primary.dark,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLOR_SCHEME.accent.blue;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${COLOR_SCHEME.accent.blue}15`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      COLOR_SCHEME.neutral.gray300;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={state.isSubmitting}
                className="w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70"
                style={{
                  background: state.isSubmitting
                    ? `${COLOR_SCHEME.neutral.gray400}`
                    : `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.purple})`,
                  boxShadow: `0 8px 24px ${COLOR_SCHEME.accent.blue}30`,
                }}
              >
                {state.isSubmitting ? (
                  <>
                    <div
                      className="w-4 h-4 border-2 border-transparent rounded-full animate-spin"
                      style={{
                        borderTopColor: COLOR_SCHEME.neutral.white,
                        borderRightColor: COLOR_SCHEME.neutral.white,
                      }}
                    />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;