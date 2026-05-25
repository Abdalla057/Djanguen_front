import { BookOpen, Search, Headphones, Plus, LayoutGrid } from "lucide-react";
import { useNotification } from "../../../Notification/notificationContex";

// Hooks
import { useGestionLivres }  from "./logique/useGestionLivre";
import { useGestionModals }   from "./logique/useGestionModal";

// Composants
import CarrouselLivres      from "./composant/carrousolLivre";
import PanneauGestionLivre  from "./composant/panneauGestionLivre";
import PanneauStatistiques  from "./composant/panneauStatistique";

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
import React from "react";

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
    modalAjoutOuverte, modalModifOuverte, modalSupprOuverte, modalAudioOuverte,
    presetAudio, ouvrirAjout, fermerAjout, ouvrirModif, ouvrirSuppr, ouvrirAudio,
    ouvrirAudioDepuisPanel, fermerTout,
  } = useGestionModals();

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

  // ── Rendu principal ───────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col">

      {/* ════ TOPBAR ════ */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                Bibliothèque
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                {livresFiltres.length} livre{livresFiltres.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 dark:bg-slate-700 shrink-0" />

          {/* Barre de recherche */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par titre ou auteur…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-gray-100 dark:bg-slate-800 border border-transparent focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 rounded-lg outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
            />
            {recherche && (
              <button
                onClick={() => setRecherche("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors text-sm leading-none"
              >
                ✕
              </button>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={ouvrirAudio}
              title="Ajouter un audio"
              className="flex items-center gap-2 h-8 px-3 rounded-lg text-xs font-medium text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-transparent hover:border-gray-200 dark:hover:border-slate-600 transition-all duration-150"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Audio</span>
            </button>

            <button
              onClick={ouvrirAjout}
              className="flex items-center gap-2 h-8 px-3 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-150"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nouveau livre</span>
            </button>
          </div>

        </div>

        {/* Bande d'erreur sous le header */}
        {erreurs.livres && (
          <div className="border-t border-red-100 dark:border-red-900/30">
            <div className="max-w-screen-xl mx-auto px-6">
              <AlerteErreur message={erreurs.livres} />
            </div>
          </div>
        )}
      </header>

      {/* ════ BODY ════ */}
      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-8">

        {/* Résultat recherche */}
        {recherche && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">
            {livresFiltres.length} résultat{livresFiltres.length > 1 ? "s" : ""} pour{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">"{recherche}"</span>
          </p>
        )}

        {livresFiltres.length === 0 ? (
          <EcranAucunResultat recherche={recherche} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ── Carrousel — 2/3 gauche ── */}
            <div className="lg:col-span-2">

              {/* Titre section */}
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                  Tous les livres
                </span>
              </div>

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

            {/* ── Colonne droite — 1/3 ── */}
            <div className="flex flex-col gap-4">

              <PanneauStatistiques
                totalLivres={statistiques.totalLivres}
                nouveautes={statistiques.nouveautes}
                enLecture={statistiques.enLecture}
              />

              {/* Séparateur */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider shrink-0">
                  Sélection
                </span>
                <div className="flex-1 h-px bg-gray-100 dark:bg-slate-800" />
              </div>

              <div
                className="overflow-y-auto rounded-xl"
                style={{ maxHeight: "70vh", scrollbarWidth: "thin" }}
              >
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
      </div>

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