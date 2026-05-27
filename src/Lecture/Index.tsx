import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/ComposantSite/userContext";

// Hooks
import { useChargementLivre }    from "@/Lecture/Logique/UseChargementLivre";
import { useChargementAudio }    from "@/Lecture/Logique/UseChargementAudio";
import { useHistoriqueLecture }  from "@/Lecture/Logique/UseHistoriqueLecture";
import { useNavigationPages }    from "@/Lecture/Logique/UseNavigationPage";

// Composants
import LecteurAudio from "@/Lecture/Composant/LecteurAudio";
import VisionneusePage  from "@/Lecture/Composant/VisionneusePage";
import NavigationPages  from "@/Lecture/Composant/NavigationPage";
import GrilleMiniatures from "@/Lecture/Composant/GrilleMiniature";

// Constantes
import { COULEURS } from "@/Lecture/constante/constante";

/* ================================================================
   ORCHESTRATEUR — PagesLivre
   Responsabilité : assembler les hooks et distribuer les données
   aux composants enfants.
   ================================================================ */
const PagesLivre = () => {
  const { id }      = useParams<{ id: string }>();
  const { profile } = useUser();
  const naviguer    = useNavigate();

  // ── Données ───────────────────────────────────────────
  const { livre, pages }              = useChargementLivre(id);
  const { mettreAJourHistorique }     = useHistoriqueLecture(id, profile?.id, livre);
  const { indexCourant, imageChargee, setImageChargee, allerVers, pageSuivante, pagePrecedente } =
    useNavigationPages(pages, mettreAJourHistorique);
  const { fichierAudio }                  = useChargementAudio(id, pages, indexCourant);

  // ── Écran de chargement ───────────────────────────────
  if (!livre || pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COULEURS.fond1 }}>
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: COULEURS.bordure, borderTopColor: COULEURS.cyan }}
          />
          <p className="font-bold" style={{ color: COULEURS.attenue }}>Chargement du livre…</p>
        </div>
      </div>
    );
  }

  const pageCourante = pages[indexCourant];
  const progression  = ((indexCourant + 1) / pages.length) * 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(160deg, ${COULEURS.fond1} 0%, ${COULEURS.fond2} 55%, ${COULEURS.fond3} 100%)` }}
    >

      {/* ════ BARRE DE NAVIGATION SUPÉRIEURE ════ */}
      <header
        className="sticky top-0 z-40 flex items-center gap-4 px-4 sm:px-8 py-3"
        style={{
          background: "rgba(15,12,41,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${COULEURS.bordure}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Bouton retour */}
        <button
          onClick={() => naviguer(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 shrink-0"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${COULEURS.bordure}`, color: COULEURS.attenue }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background  = "rgba(99,102,241,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color       = COULEURS.texte;
            (e.currentTarget as HTMLButtonElement).style.borderColor = COULEURS.bleu;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background  = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.color       = COULEURS.attenue;
            (e.currentTarget as HTMLButtonElement).style.borderColor = COULEURS.bordure;
          }}
          aria-label="Retour à la bibliothèque"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span className="hidden sm:inline">Bibliothèque</span>
        </button>

        {/* Titre + page courante */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm sm:text-base font-black truncate" style={{ color: COULEURS.texte, letterSpacing: "-0.3px" }}>
            {livre.titre}
          </h1>
          <p className="text-xs font-semibold" style={{ color: COULEURS.discret }}>
            Page {pageCourante.numero} sur {pages.length}
          </p>
        </div>

        {/* Badge compteur */}
        <div
          className="px-3 py-1.5 rounded-xl text-xs font-black shrink-0 tabular-nums"
          style={{
            background: `linear-gradient(135deg, ${COULEURS.bleu}, ${COULEURS.violet})`,
            color: "#fff",
            boxShadow: `0 2px 10px ${COULEURS.lueur}`,
          }}
        >
          {indexCourant + 1} / {pages.length}
        </div>
      </header>

      {/* ════ BARRE DE PROGRESSION GLOBALE ════ */}
      <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full"
          style={{
            width: `${progression}%`,
            background: `linear-gradient(to right, ${COULEURS.bleu}, ${COULEURS.cyan})`,
            boxShadow: `0 0 8px ${COULEURS.lueurC}`,
            transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* ════ CONTENU PRINCIPAL ════ */}
      <main className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-8 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">

        {/* ── Colonne gauche : image + navigation ── */}
        <div className="flex-1 flex flex-col items-center">
          <VisionneusePage
            imagePath={pageCourante.imagePath}
            numeroPage={pageCourante.numero}
            imageChargee={imageChargee}
            onImageChargee={() => setImageChargee(true)}
          />
          <NavigationPages
            indexCourant={indexCourant}
            totalPages={pages.length}
            progression={progression}
            allerVers={allerVers}
            pageSuivante={pageSuivante}
            pagePrecedente={pagePrecedente}
          />
        </div>

        {/* ── Colonne droite : audio + miniatures ── */}
        <aside className="w-full lg:w-72 flex flex-col gap-5 mt-6 lg:mt-0 shrink-0">

          {/* Lecteur audio ou message d'absence */}
          {fichierAudio ? (
            <div className="fade-in">
              <LecteurAudio key={fichierAudio} src={fichierAudio} />
            </div>
          ) : (
            <div
              className="rounded-2xl px-5 py-5 flex flex-col items-center gap-2 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px dashed ${COULEURS.bordure}` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COULEURS.discret} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zm12-2a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
              <p className="text-xs font-bold" style={{ color: COULEURS.discret }}>Pas d'audio pour cette page</p>
            </div>
          )}

          <GrilleMiniatures
            pages={pages}
            indexCourant={indexCourant}
            allerVers={allerVers}
          />
        </aside>
      </main>
    </div>
  );
};

export default PagesLivre;