import React, { useState } from "react";
import {
  Mail, MapPin, Phone, Send, CheckCircle,
  Facebook, Instagram, Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

interface FormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: "", email: "", sujet: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ nom: "", email: "", sujet: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden py-6 px-6">
      {/* Fond */}
      <div className="absolute inset-0 bg-gray-50" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#0C3B2E]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFBA00]/15 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="px-4 py-2 rounded-lg bg-[#FFBA00]/15 text-[#0C3B2E] text-sm font-semibold border border-[#FFBA00]/30">
            CONTACT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C3B2E] mt-4">
            Restons en contact
          </h2>
          <p className="max-w-xl mx-auto mt-3 text-slate-500">
            Une question, une suggestion ou un partenariat ? Nous sommes à votre écoute.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── Informations ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0C3B2E] rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Nos coordonnées</h3>

            <div className="space-y-5">
              {/* Adresse */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFBA00]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#FFBA00]" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Adresse</p>
                  <p className="text-white font-semibold">Dakar, Sénégal</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFBA00]/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#FFBA00]" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white font-semibold">contact@bibliotheque.com</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFBA00]/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#FFBA00]" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Téléphone</p>
                  <p className="text-white font-semibold">+221 77 123 45 67</p>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook,  bg: "hover:bg-blue-600"  },
                  { icon: Instagram, bg: "hover:bg-pink-600"  },
                  { icon: Linkedin,  bg: "hover:bg-sky-600"   },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      className={`w-11 h-11 rounded-xl bg-white/10 border border-white/10
                        text-white flex items-center justify-center hover:text-white
                        hover:-translate-y-1 transition-all duration-300 ${item.bg}`}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Formulaire ── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-lg border border-[#0C3B2E]/10"
          >
            <h3 className="text-2xl font-bold text-[#0C3B2E] mb-6">
              Envoyez-nous un message
            </h3>

            {success ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#0C3B2E] flex items-center justify-center">
                  <CheckCircle className="text-[#FFBA00]" size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#0C3B2E] mt-4">Message envoyé !</h4>
                <p className="text-slate-500 mt-2 text-center">Merci pour votre message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {["nom", "email", "sujet"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    placeholder={field === "nom" ? "Votre nom" : field === "email" ? "Votre email" : "Sujet"}
                    required={field !== "sujet"}
                    className="w-full p-3 rounded-xl border border-[#0C3B2E]/15 bg-gray-50
                      focus:ring-2 focus:ring-[#0C3B2E]/20 focus:border-[#0C3B2E] outline-none
                      text-[#0C3B2E] placeholder-slate-400 text-sm transition-colors"
                  />
                ))}

                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                  className="w-full p-3 rounded-xl border border-[#0C3B2E]/15 bg-gray-50
                    resize-none focus:ring-2 focus:ring-[#0C3B2E]/20 focus:border-[#0C3B2E]
                    outline-none text-[#0C3B2E] placeholder-slate-400 text-sm transition-colors"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-[#0C3B2E] bg-[#FFBA00]
                    hover:bg-[#e6a800] flex items-center justify-center gap-2 shadow-lg
                    shadow-[#FFBA00]/20 transition-colors disabled:opacity-50"
                >
                  {loading ? "Envoi en cours..." : (<>Envoyer le message <Send size={18} /></>)}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;