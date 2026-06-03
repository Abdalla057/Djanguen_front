import React from "react";

import {BookOpen } from "lucide-react";


const Header = () => {

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-10">

      <div className="px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-5">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-red-500" />
            </div>

            <div>
              <h2 className="text-[15px] font-semibold text-slate-800">
                Gestion des livres
              </h2>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Administration des livres
              </p>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;