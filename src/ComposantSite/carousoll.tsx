import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;

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
        const res = await axios.get(`${API_URL}/admin/livre`);
        setLivres(Array.isArray(res.data) ? res.data : res.data.livres || []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Erreur livres :", err.response?.data || err.message);
        } else if (err instanceof Error) {
          console.error("Erreur livres :", err.message);
        } else {
          console.error("Erreur inconnue");
        }
      }
    };

    fetchLivres();
  }, []);

  const displayedLivres =
    livres.length < 3 ? [...livres, ...livres, ...livres] : livres;

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-[#0C3B2E]/15 bg-[#0C3B2E]/[0.03]">

      {/* Bande décorative supérieure */}
      <div className="h-1 w-full bg-[#FFBA00]" />

      <div className="p-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={displayedLivres.length > 2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-[#0C3B2E]/30 !w-1.5 !h-1.5",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-[#FFBA00] !w-4 !rounded-full",
          }}
        >
          {displayedLivres.map((livre, idx) => (
            <SwiperSlide key={`${livre.id}-${idx}`}>
              <div className="w-full h-[320px] flex items-center justify-center px-4 pb-8">
                <img
                  src={
                    livre.cover
                      ? `${API_URL}/uploads/images/${livre.cover}`
                      : "/placeholder.png"
                  }
                  alt={livre.titre}
                  className="h-full w-auto object-cover rounded-2xl shadow-lg border border-[#0C3B2E]/10"
                />
              </div>

              {/* Titre du livre */}
              {livre.titre && (
                <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                  <span className="inline-block text-xs font-semibold text-[#0C3B2E] bg-white/90 px-3 py-1 rounded-full border border-[#0C3B2E]/10 shadow-sm">
                    {livre.titre}
                  </span>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LivreCarousel;