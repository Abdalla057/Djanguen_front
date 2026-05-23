import React, { ReactNode, useMemo } from "react";
import Header from "../ComposantSite/Header";
import Footer from "../ComposantSite/footer";
import Propos from "../ComposantSite/propos";
import Contact from "../ComposantSite/contact";
import LesLivres from "../ComposantSite/leslivres";
import BouttonFlottant from "../ComposantSite/BoutonFlottan";

interface PrincipalProps {
  children?: ReactNode;  // Rendre children optionnel
  showPropos?: boolean;
  showContact?: boolean;
}

/**
 * Composant Principal - Layout principal du site
 * Contient Header, Footer, et sections globales
 */
const Principal: React.FC<PrincipalProps> = ({
  children,
  showPropos = true,
  showContact = true,
}) => {

  // Mémoriser les sections pour éviter les re-renders inutiles
  
  const headerComponent = useMemo(() => <Header />, []);

  const proposComponent = useMemo(
    () => showPropos && <Propos />,
    [showPropos]
  );

  const leslivreComponent = useMemo(
    () => <LesLivres />,
    []
  );

  const contactComponent = useMemo(
    () => showContact && <Contact />,
    [showContact]
  );

  const footerComponent = useMemo(() => <Footer />, []);
  
  const bouttonFlottantComponent = useMemo(
    () => <BouttonFlottant />,
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Bouton Flottant - Visible sur tout le site */}
      {bouttonFlottantComponent}

      {/* Header */}
      <div className="w-full">
        {headerComponent}
      </div>

      {/* Sections globales avant le contenu principal */}
      <div className="w-full mt-16">
        {proposComponent}
      </div>

      <div className="w-full mt-16">
        {leslivreComponent}
      </div>

      <div className="w-full mt-16">
        {contactComponent}
      </div>

      {/* Contenu spécifique à la page */}
      {children && (
        <main className="flex-1 w-full mt-16 mb-16">
          {children}
        </main>
      )}

      {/* Footer */}
      <div className="w-full">
        {footerComponent}
      </div>
    </div>
  );
};

export default Principal;