import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./ComposantSite/userContext";
import AdminLayout from "./Admin/ComposantTableau/gestionLivre/adminLayout";
import UtilisateurLayout from "./Utilisateur/Tableau de bord/utilisateurLayout"
import NotificationProvider from "./Notification/notificationContex";

// Admin

import IndexUI from "./Lecture/IndexLecture";
import AdminHome from "./Admin/ComposantTableau/Tableau de bord/AdminHome";
import UtilisateurAccueil from "./Utilisateur/Tableau de bord/utilisateuraccueil"
import IndexBibliotheque from "./Admin/Bibliothéque/indexBibliotheque";
import Listelivres from "./Admin/ComposantTableau/gestionLivre/index";
import IndexLecture from "./Lecture/IndexLecture";

// Site / Utilisateur
import Site from "./site/principal";       // ← point d'entrée principal du site
import Connection from "./Connection/connection";
import InscriptionPage from "./Connection/inscription";
import Index from './historique/index';
import ProfilPage from "./ComposantSite/Profil";
import IndexAccueil from "./Utilisateur/pageAccueil/indexAccueil";

import React from "react";
import Footer from "./ComposantSite/footer";


export default function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <Routes>

            {/* ── Connexion / Inscription ── */}
            <Route path="/"          element={<Site/>} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/inscrire"  element={<InscriptionPage />} />

            {/* ── Site principal (navbar + toutes les sections) ── */}
            <Route path="/site"   element={<Site />} />

            {/* ── Pages dédiées hors site ── */}
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/lecture/historique/:userId" element={<Index />} />
            <Route path="/livre/:id/pages" element={<IndexUI />} />
            
            {/* ── Utilisateurs avec layout persistant ── */}
             
            <Route path="/utilisateur" element={<UtilisateurLayout />}>
              <Route index element={<Navigate to="accueil" replace />} />
              <Route path="accueil"              element={<UtilisateurAccueil />} />
              <Route path="bibliotheque"         element={<IndexBibliotheque role="utilisateur" />} />
              <Route path="historique"           element={<Index role="utilisateur" />} />
              <Route path="livre/:id/pages"      element={<IndexLecture />} />  {/* ← ajoute */}
              <Route path="accueil"      element={<IndexAccueil />} />  {/* ← ajoute */}

            </Route>

                          {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home"                 element={<AdminHome />} />
              <Route path="livres"               element={<Listelivres />} />   {/* ← corrige le slash */}
              <Route path="bibliotheque"         element={<IndexBibliotheque role="admin" />} />
              <Route path="historique"           element={<Index role="admin" />} />
              <Route path="footer"               element={<Footer />} />
              <Route path="livre/:id/pages"      element={<IndexLecture />} />  {/* ← ajoute */}
            </Route>

          </Routes>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}