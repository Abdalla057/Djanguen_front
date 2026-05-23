import { BookOpen, Eye, Sparkles } from "lucide-react";
import React from "react";

interface StatsSummaryProps {
  totalLivres: number;
}

const Stats = ({ totalLivres }: StatsSummaryProps) => {
  return (
    <>
      {/* Stats Summary - Aligné avec la colonne du carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Summary Cards - Prend 2 colonnes pour s'aligner avec le carousel */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Livres</p>
                <p className="text-3xl font-bold text-slate-800">{totalLivres}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Nouveautés</p>
                <p className="text-3xl font-bold text-slate-800">
                  {Math.min(5, totalLivres)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">En lecture</p>
                <p className="text-3xl font-bold text-slate-800">
                  {Math.ceil(totalLivres * 0.3)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Espace vide à droite pour alignement */}
        <div className="hidden lg:block"></div>
      </div>
    </>
  );
};

export default Stats;