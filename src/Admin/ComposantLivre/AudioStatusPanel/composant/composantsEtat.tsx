import React from "react";
import { Loader2, BookOpen } from "lucide-react";

export const EtatChargement = () => (
  <div className="flex items-center justify-center py-8 gap-3">
    <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#3b82f6" }} />
    <span className="text-sm font-semibold" style={{ color: "#475569" }}>
      Chargement des pages...
    </span>
  </div>
);

export const EtatAucunePage = () => (
  <div className="text-center py-8">
    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" style={{ color: "#60a5fa" }} />
    <p className="text-sm font-bold" style={{ color: "#475569" }}>
      Aucune page trouvée pour ce livre
    </p>
  </div>
);