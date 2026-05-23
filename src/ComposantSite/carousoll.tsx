import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

interface Livre {
  id: number;
  titre: string;
  cover: string;
}

const LivreCarousel = () => {
  const [livres, setLivres] = useState<Livre[]>([]);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        // 🔑 Récupérer le token JWT depuis le localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token JWT absent');
          return;
        }
        console.log('Token JWT:', token);

        const res = await axios.get('http://localhost:3000/admin/livre', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Vérifier que res.data est un tableau
        setLivres(Array.isArray(res.data) ? res.data : res.data.livres || []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            'Erreur lors du chargement des livres :',
            err.response?.data || err.message,
          );
        } else if (err instanceof Error) {
          console.error('Erreur lors du chargement des livres :', err.message);
        } else {
          console.error('Erreur inconnue lors du chargement des livres');
        }
      }
    };

    fetchLivres();
  }, []);

  const displayedLivres =
    livres.length < 3 ? [...livres, ...livres, ...livres] : livres;

  return (
    <div className="flex-1 max-w-xl w-full shadow-2xl shadow-pink-500 animate-fade-down">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={displayedLivres.length > 2}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {displayedLivres.map((livre) => (
          <SwiperSlide key={livre.id}>
            <div className="w-full h-[300px] flex items-center justify-center">
              <img
                src={
                  livre.cover
                    ? `http://localhost:3000/uploads/images/${livre.cover}`
                    : '/placeholder.png'
                }
                alt={livre.titre}
                className="h-full object-cover shadow-4xl border-4 border-b-blue-600 border-l-pink-500 border-r-blue-600 border-t-yellow-400 rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LivreCarousel;
