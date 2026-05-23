import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./ComposantSite/userContext";
import AdminLayout from "./Admin/ComposantTableau/adminLayout";
import NotificationProvider from "./Notification/notificationContex";

// Admin

import PagesLivre from "./Lecture/Index";
import ListeModifier from "./Admin/ComposantLivre/ListeModifier/listemodifier";
import AjouterAudio from "./Admin/ComposantLivre/AjouterAudio/Index";
import AdminHome from "./Admin/ComposantTableau/AdminHome";
import Bibliothèque from "./Admin/Bibliothéque/index";
import Listelivres from "./Admin/ComposantLivre/Gestion des livres/Index";

// Site / Utilisateur
import Site from "./site/principal";       // ← point d'entrée principal du site
import Connection from "./Connection/connection";
import InscriptionPage from "./Connection/inscription";
import HistoriqueLecture from './Historique/HistoriqueLecture';
import ProfilPage from "./ComposantSite/Profil";

import React from "react";
import Footer from "./ComposantSite/footer";

export default function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <Routes>

            {/* ── Connexion / Inscription ── */}
            <Route path="/"          element={<Connection />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/inscrire"  element={<InscriptionPage />} />

            {/* ── Site principal (navbar + toutes les sections) ── */}
            <Route path="/site"   element={<Site />} />

            {/* ── Pages dédiées hors site ── */}
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/lecture/historique/:userId" element={<HistoriqueLecture />} />
            <Route path="/livre/:id/pages" element={<PagesLivre />} />

            {/* ── Admin avec layout persistant ── */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="home" replace />} /> 
              <Route path="home"       element={<AdminHome />} />
              <Route path="/admin/livres"     element={<Listelivres />} />
              <Route path="bibliotheque" element={<Bibliothèque />} />
              <Route path="historique" element={<HistoriqueLecture />} />
              <Route path="audio"      element={<AjouterAudio />} />
              <Route path="affichage"  element={<ListeModifier />} />
              <Route path="footer"  element={<Footer />} />
            </Route>

          </Routes>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}