import React from "react";

import Header from "./Header";
import Propos from "./propos";
import BibliothèqueSite from "./BibliothèqueSite";
import Contact from "./contact";
import Footer from "./footer";

const Couleur = {
  bg1: "#1a1a2e",
  bg2: "#16213e",
  bg3: "#0f3460",
} as const;

const Site: React.FC = () => {
  return (
    <main>
      {/* HERO + NAVBAR */}
      <Header />

      {/* ABOUT */}
      <section
        id="apropos"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(160deg, ${Couleur.bg2}, ${Couleur.bg3}, ${Couleur.bg1})`,
        }}
      >
        <Propos />
      </section>

      {/* BIBLIOTHEQUE */}
      <section
        id="Bibliothequesite"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(160deg, ${Couleur.bg3}, ${Couleur.bg1}, ${Couleur.bg2})`,
        }}
      >
        <BibliothèqueSite />
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(160deg, ${Couleur.bg1}, ${Couleur.bg2}, ${Couleur.bg3})`,
        }}
      >
        <Contact />
      </section>

      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Site;