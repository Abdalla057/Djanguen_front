import React from 'react';
import MainContent from './ComposantAccueil/index';

export default function AdminHome() {
  return (
    <div
      className="min-h-screen p-6 flex gap-6 font-sans"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Halo décoratif haut-gauche */}
      <div
        style={{
          position: 'fixed',
          top: '-120px',
          left: '-120px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194,0,116,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Halo décoratif bas-droite */}
      <div
        style={{
          position: 'fixed',
          bottom: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div
        className="flex-1 rounded-2xl p-6 relative z-10"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <MainContent />
      </div>

    </div>
  );
}