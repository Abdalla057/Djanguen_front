import React from 'react';
import MainContent from '../ComposantAccueil/index';

export default function AdminHome() {
  return (
    <div className="min-h-screen p-6 flex gap-6 font-sans ">

      {/* ── Halo haut-gauche ── */}
      

      {/* ── Halo bas-droite ── */}
      <div className="fixed -bottom-24 -right-24 w-[500px] h-[300px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(200,232,240,0.5) 0%, transparent 70%)" }}
      />

      {/* ── Main Content ── */}
      <div className="flex-1 ">
        <MainContent />
      </div>

    </div>
  );
}