import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSignOutAlt, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useUser } from './userContext';
import React from 'react';
const API_URL = import.meta.env.VITE_API_URL ?? "../../api";

interface HistoriqueEntry {
  id: string | number;
  livreId: number;
  dernierePage: number | string;
  derniereAudio: number | string;
  updatedAt: string | Date;
  livre?: { id: string | number; titre: string };
}

const ProfilPage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [historique, setHistorique] = useState<HistoriqueEntry[]>([]);
  const [formData, setFormData] = useState({
    nomUtilisateur: profile?.nomUtilisateur || '',
    prenomUtilisateur: profile?.prenomUtilisateur || '',
    email: profile?.email || '',
  });

  useEffect(() => {
    const fetchHistorique = async () => {
      if (!profile?.id) return;
      try {
        const response = await fetch(`${API_URL}lecture/historique/${profile.id}`);
        if (!response.ok) throw new Error('Erreur');
        const data = await response.json();
        setHistorique(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erreur:', err);
      }
    };
    fetchHistorique();
  }, [profile?.id]);

  const handleSaveChanges = useCallback(() => {
    updateProfile({
      nomUtilisateur: formData.nomUtilisateur,
      prenomUtilisateur: formData.prenomUtilisateur,
      email: formData.email,
    });
    setIsEditing(false);
  }, [formData, updateProfile]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const deleteHistorique = async (entryId: string | number) => {
    try {
      const response = await fetch(`${API_URL}lecture/historique/${entryId}`, { method: 'DELETE' });
      if (response.ok) {
        setHistorique(historique.filter(h => h.id !== entryId));
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center pt-28 text-white"><p>Chargement...</p></div>;
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-2xl p-8 mb-12 shadow-2xl bg-slate-800/60">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <div className="flex items-center gap-8 flex-1">
              <div className="w-28 h-28 rounded-full flex items-center justify-center text-7xl font-bold bg-white/20 text-white">
                {profile.avatar || '👤'}
              </div>
              <div className="text-white flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <input value={formData.prenomUtilisateur} onChange={(e) => setFormData({ ...formData, prenomUtilisateur: e.target.value })} placeholder="Prénom" className="block w-full px-3 py-1.5 rounded bg-white/20 text-white border border-white/50 outline-none" />
                    <input value={formData.nomUtilisateur} onChange={(e) => setFormData({ ...formData, nomUtilisateur: e.target.value })} placeholder="Nom" className="block w-full px-3 py-1.5 rounded bg-white/20 text-white border border-white/50 outline-none" />
                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="block w-full px-3 py-1.5 rounded bg-white/20 text-white border border-white/50 outline-none" />
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-black">{profile.prenomUtilisateur} {profile.nomUtilisateur}</h1>
                    <p className="text-white/80 text-lg mt-2">📧 {profile.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSaveChanges} className="px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold">✅ Enregistrer</button>
                  <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg bg-white/20 text-white font-bold">❌ Annuler</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 rounded-lg bg-white/20 text-white font-bold flex items-center gap-2"><FaEdit /> Modifier</button>
                  <button onClick={handleLogout} className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-bold flex items-center gap-2"><FaSignOutAlt /> Déco</button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="p-6 rounded-xl shadow-lg bg-blue-500/10 border-l-4 border-blue-500">
            <p className="text-gray-300 text-sm font-bold">Sessions</p>
            <p className="text-4xl font-black text-white mt-2">{historique.length}</p>
        </div>
          <div className="p-6 rounded-xl shadow-lg bg-purple-500/10 border-l-4 border-purple-500">
          <p className="text-gray-300 text-sm font-bold">Livres</p>
          <p className="text-4xl font-black text-white mt-2">{new Set(historique.map(h => h.livreId)).size}</p>
       </div>
      <div className="p-6 rounded-xl shadow-lg bg-cyan-500/10 border-l-4 border-cyan-500">
         <p className="text-gray-300 text-sm font-bold">ID</p>
         <p className="text-4xl font-black text-white mt-2">{profile.id}</p>
     </div>
     </div>

      <div className="rounded-2xl p-8 shadow-xl mb-8 bg-slate-800/60">
      <h2 className="text-2xl font-black text-white mb-6">📚 Historique récent ({historique.length})</h2>
        {historique.length > 0 ? (
        <div className="space-y-4 mb-6">
      {historique.slice(0, 5).map((entry) => (
        <div key={entry.id} className="p-5 rounded-xl flex justify-between items-center bg-slate-900/60 border-l-[3px] border-cyan-500">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">{entry.livre?.titre}</h3>
            <div className="flex gap-6 mt-2 text-sm text-gray-400">
              <span> Page {entry.dernierePage}</span>
              <span> Audio {entry.derniereAudio}</span>
              <span> {new Date(entry.updatedAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <button onClick={() => deleteHistorique(entry.id)} className="p-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white ml-4 transition">
            <FaTrash size={18} />
          </button>
        </div>
      ))}
    </div>
  ) 
     : (
            <p className="text-center text-gray-400 py-8 mb-6">Aucune lecture enregistrée</p>
          )}
          {historique.length > 0 && (
            <button onClick={() => navigate(`/lecture/historique/${profile.id}`)} className="w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:shadow-2xl transition-all bg-gradient-to-r from-cyan-500 to-blue-500">
              Voir tout l'historique ({historique.length} sessions) <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;