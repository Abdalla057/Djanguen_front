import React, { useEffect } from "react";
import { BookOpen, Search, Headphones, Zap } from "lucide-react";
import { useNotification } from "../../../Notification/notificationContex";

// Hooks
import { useGestionLivres }       from "./logique/useGestionLivre";
import { useGestionUtilisateurs } from "./logique/useGestionUtilisateur";
import { useGestionModals }       from "./logique/useGestionModal";

// Composants
import CarrouselLivres      from "./composant/carrousolLivre";
import PanneauGestionLivre  from "./composant/panneauGestionLivre";
import PanneauStatistiques  from "./composant/panneauStatistique";
import SectionUtilisateurs  from "./composant/sectionUtilisateur";
import {
  EcranChargement,
  EcranVide,
  AlerteErreur,
  EcranAucunResultat,
} from "../Gestion des livres/composant/composantEtat";

// Modals (chemins inchangés)
import AjouterLivre   from "../../../Admin/ComposantLivre/AjouterLivre";
import ModifierLivre  from "../ModifierLivre/modifierlivre";
import SupprimerLivre from "../SupprimerLivre/supprimerlivre";
import UploaderAudio  from "../../../Admin/ComposantLivre/AjouterAudio/Index";

/* ================================================================
   ORCHESTRATEUR — ListeLivres
   Responsabilité : assembler les hooks et distribuer les données
   aux composants enfants.
   ================================================================ */
const ListeLivres = () => {
  const { showNotification } = useNotification();

  // ── Hooks ─────────────────────────────────────────────
  const {
    livres, livresFiltres, recherche, setRecherche,
    indexActuel, chargement, erreurs, chargerLivres,
    allerVers, allerPrecedent, allerSuivant,
    livreCourant, livresVisibles, statistiques,
  } = useGestionLivres();

  const {
    utilisateurs, utilisateursAffiches, afficherTous,
    chargementUtilisateurs, chargerUtilisateurs, basculerAffichage,
  } = useGestionUtilisateurs();

  const {
    modalAjoutOuverte, modalModifOuverte, modalSupprOuverte, modalAudioOuverte,
    presetAudio, ouvrirAjout, fermerAjout, ouvrirModif, ouvrirSuppr, ouvrirAudio,
    ouvrirAudioDepuisPanel, fermerTout,
  } = useGestionModals();

  // ── Chargement initial ────────────────────────────────
  useEffect(() => {
    chargerLivres();
    chargerUtilisateurs();
  }, [chargerLivres, chargerUtilisateurs]);

  // ── Callbacks succès modals ───────────────────────────
  const gererSuccesModif = () => {
    fermerTout();
    chargerLivres();
    showNotification("Livre modifié avec succès !", "success");
  };

  const gererSuccesSuppr = () => {
    fermerTout();
    chargerLivres();
    showNotification("Livre supprimé avec succès !", "success");
  };

  const gererSuccesAudio = () => {
    fermerTout();
    chargerLivres();
    showNotification("Audio ajouté avec succès !", "success");
  };

  // ── États alternatifs ─────────────────────────────────
  // ✅ Après — le modal est rendu avec EcranVide
    if (chargement.livres) return <EcranChargement />;

       if (livres.length === 0) return (
      <>
         <EcranVide onAjouter={ouvrirAjout} />
         <AjouterLivre
          isOpen={modalAjoutOuverte}
          onClose={fermerAjout}
          onSuccess={chargerLivres}
        />
     </>
   );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4 relative overflow-hidden">

      {/* Lumières d'ambiance */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/6 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ════ EN-TÊTE ════ */}
        <div className="mb-10">
          {erreurs.livres && <AlerteErreur message={erreurs.livres} />}

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/20">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Bibliothèque</h1>
              <p className="text-slate-400 text-sm mt-0.5">
                {livresFiltres.length} livre{livresFiltres.length > 1 ? "s" : ""} disponible{livresFiltres.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par titre ou auteur…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-white placeholder-slate-500 text-sm"
            />
            {recherche && (
              <button
                onClick={() => setRecherche("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
            )}
          </div>

          {recherche && (
            <p className="mt-3 text-slate-400 text-sm">
              {livresFiltres.length} résultat{livresFiltres.length > 1 ? "s" : ""} pour "
              <span className="text-indigo-300 font-medium">{recherche}</span>"
            </p>
          )}
        </div>

        {/* ════ CONTENU ════ */}
        {livresFiltres.length === 0 ? (
          <EcranAucunResultat recherche={recherche} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Carrousel 3D ── */}
            <div className="lg:col-span-2">
              <CarrouselLivres
                livresVisibles={livresVisibles}
                livreCourant={livreCourant}
                indexActuel={indexActuel}
                totalLivres={livresFiltres.length}
                allerVers={allerVers}
                allerPrecedent={allerPrecedent}
                allerSuivant={allerSuivant}
                livresFiltres={livresFiltres}
              />
            </div>

            {/* ── Colonne droite ── */}
            <div className="flex flex-col gap-5">
              <PanneauStatistiques
                totalLivres={statistiques.totalLivres}
                nouveautes={statistiques.nouveautes}
                enLecture={statistiques.enLecture}
              />
              <div className="flex-1 overflow-y-auto" style={{ maxHeight: "70vh", scrollbarWidth: "thin" }}>
                <PanneauGestionLivre
                  livreCourant={livreCourant}
                  livreid={livreCourant?.id ?? 0}
                  onOuvrirModif={ouvrirModif}
                  onOuvrirSuppr={ouvrirSuppr}
                  onAudioDepuisPanel={ouvrirAudioDepuisPanel}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Section utilisateurs ── */}
        <SectionUtilisateurs
          utilisateurs={utilisateurs}
          utilisateursAffiches={utilisateursAffiches}
          afficherTous={afficherTous}
          chargement={chargementUtilisateurs}
          onBasculerAffichage={basculerAffichage}
        />
      </div>

      {/* ════ BOUTONS FLOTTANTS ════ */}
      <button
        onClick={ouvrirAudio}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        title="Ajouter un audio"
      >
        <Headphones className="w-6 h-6" />
      </button>
      <button
        onClick={ouvrirAjout}
        className="fixed bottom-28 right-8 w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        title="Ajouter un livre"
      >
        <Zap className="w-5 h-5" />
      </button>

      {/* ════ MODALS ════ */}
      <AjouterLivre
        isOpen={modalAjoutOuverte}
        onClose={fermerAjout}
        onSuccess={chargerLivres}
      />

      {modalModifOuverte && livreCourant && (
        <ModifierLivre
          livre={livreCourant}
          isOpen={modalModifOuverte}
          onClose={fermerTout}
          onSuccess={gererSuccesModif}
        />
      )}

      {modalSupprOuverte && livreCourant && (
        <SupprimerLivre
          livre={livreCourant}
          isOpen={modalSupprOuverte}
          onClose={fermerTout}
          onSuccess={gererSuccesSuppr}
        />
      )}

      <UploaderAudio
        isOpen={modalAudioOuverte}
        onClose={fermerTout}
        onSuccess={gererSuccesAudio}
        livres={livres}
        defaultLivreId={presetAudio?.livreId}
        defaultPageDebut={presetAudio?.pageDebut}
        defaultPageFin={presetAudio?.pageFin}
      />
    </div>
  );
};

export default ListeLivres;