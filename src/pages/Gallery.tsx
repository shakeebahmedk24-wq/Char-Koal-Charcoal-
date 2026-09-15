import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GalleryItem } from '../types/restaurant';
import {
  Image as ImageIcon,
  Flame,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera,
  CalendarCheck
} from 'lucide-react';

export const Gallery: React.FC = () => {
  const { galleryItems, setCurrentPage } = useRestaurant();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'hearth', label: 'The Live Hearth' },
    { id: 'dishes', label: 'Culinary Masterpieces' },
    { id: 'banquet', label: 'Banquets & Galas' },
    { id: 'ambiance', label: 'Atmosphere & Architecture' }
  ];

  const filteredPhotos = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header Banner */}
      <section className="relative py-16 bg-[#0d1015] border-b border-[#1f242d] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Gastronomy & Architecture</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            The Char-Koal Gallery
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Witness the glow of white oak embers, architectural banquets, and culinary artistry captured in vivid detail.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-30 bg-[#0e1218]/95 backdrop-blur-md border-b border-[#212734] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                  : 'bg-[#151a23] text-neutral-400 hover:text-white hover:bg-[#1f2633] border border-neutral-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-80 rounded-xl overflow-hidden border border-neutral-800 bg-[#12161f] cursor-pointer shadow-lg hover:border-amber-500/50 transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-white mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-sm text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-neutral-800/80 text-white hover:bg-neutral-700 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-amber-500 hover:text-neutral-950 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-amber-500 hover:text-neutral-950 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-neutral-700 shadow-2xl"
            />
            <div className="text-center mt-4 space-y-1 max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-neutral-300">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="py-16 text-center border-t border-[#1d222b] bg-[#0c0e13]">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Experience the Atmosphere in Person
          </h3>
          <p className="text-xs text-neutral-400">
            Book an intimate table by the live hearth or tour our banquet ballrooms for your upcoming gala.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('booking')}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs uppercase tracking-wider font-bold rounded-md"
            >
              Reserve Table
            </button>
            <button
              onClick={() => setCurrentPage('banquet')}
              className="px-6 py-2.5 bg-[#171c26] border border-neutral-700 text-neutral-200 text-xs uppercase tracking-wider rounded-md"
            >
              Inquire Banquet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
