import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BookOpen, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0C3B2E] overflow-hidden mt-16">
      {/* Décoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#0C3B2E] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#0C3B2E] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-[#FFBA00] shadow-lg">
                <BookOpen className="w-6 h-6 text-[#0C3B2E]" />
              </div>

              <h2 className="text-2xl font-bold text-white/80">
                Ma
                <span className="text-[#FFBA00]">Bibliothèque</span>
              </h2>
            </div>

            <p className="text-white/80 leading-relaxed font-bold">
              Découvrez une vaste collection de livres religieux,
              éducatifs et spirituels accessibles partout et à tout moment.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 mt-6">
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-white
                    shadow-md
                    flex items-center justify-center
                    text-[#0C3B2E]
                    hover:bg-[#0C3B2E]/80
                    hover:text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Liens utiles */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white/80 mb-5 pl-10">
              Liens utiles
            </h3>

            <ul className="space-y-3 pl-10 ">
              {[
                "Conditions d'utilisation",
                "Politique de confidentialité",
                "FAQ",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="
                      text-white/80
                      hover:text-blue-600
                      transition-colors
                      duration-300
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white/80 mb-5 pl-20">
              Newsletter
            </h3>

            <p className="text-white/80 font-bold mb-4 pl-20">
              Recevez les dernières nouveautés.
            </p>

            <form className="space-y-3 pl-20">
              <div className="relative">
                <Mail
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    w-4 h-4
                  "
                />

                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="
                    w-full
                    pl-10
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  bg-[#FFBA00]/80
                  to-white
                  text-[#0C3B2E]
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:scale-[1.02]
                  transition-all
                "
              >
                S'abonner
                <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bas du footer */}
        <div className="border-t border-slate-300 mt-10 pt-6 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#FFBA00]/80">
              MaBibliothèque
            </span>
            . Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;