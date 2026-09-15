import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  FileText,
  Printer,
  Download,
  Flame,
  CheckCircle2,
  Sparkles,
  Building2,
  UtensilsCrossed,
  Wine,
  PhoneCall
} from 'lucide-react';

export const MenuKit: React.FC = () => {
  const { menuItems, banquetHalls, cateringPackages, setCurrentPage, showToast } = useRestaurant();
  const [activeView, setActiveView] = useState<'all' | 'banquet' | 'restaurant'>('all');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast('Opening print dialog. Select "Save as PDF" to download your official Menu Kit.');
    window.print();
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header Banner - No Print */}
      <section className="no-print relative py-16 bg-[#0d1015] border-b border-[#1f242d] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Event & Restaurant Folio</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            Char-Koal Menu Kit
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Download or print our complete culinary repertoire, banquet packages, cellar allocations, and venue specifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Menu Kit</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-md bg-[#161b24] hover:bg-[#1f2634] border border-neutral-700 text-neutral-200 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Save as PDF Folio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs - No Print */}
      <div className="no-print max-w-4xl mx-auto px-4 sm:px-6 py-6 flex justify-center gap-2">
        <button
          onClick={() => setActiveView('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            activeView === 'all'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-[#151922] text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          Complete Folio (All)
        </button>
        <button
          onClick={() => setActiveView('banquet')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            activeView === 'banquet'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-[#151922] text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          Banquet & Catering Packages
        </button>
        <button
          onClick={() => setActiveView('restaurant')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            activeView === 'restaurant'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-[#151922] text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          Hearth A La Carte Menu
        </button>
      </div>

      {/* Printable Menu Kit Document */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          id="printable-menu-kit-doc"
          className="bg-[#11141c] border border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-12 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
        >
          {/* Document Masthead */}
          <div className="border-b-2 border-amber-500/40 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-amber-500 font-bold mb-1">
                <Flame className="w-5 h-5 text-amber-400 print:text-black" />
                <span className="text-xs uppercase tracking-[0.25em]">Artisanal Live-Fire Hearth & Banquet</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white print:text-black">
                CHAR-KOAL FOLIO & MENU KIT
              </h2>
              <p className="text-xs text-neutral-400 print:text-neutral-600 mt-1">
                742 Charcoal Avenue, Culinary District &bull; (555) 242-7562 &bull; concierge@char-koal.com
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-neutral-400 print:text-neutral-600 font-mono">
              <div>Effective: {new Date().getFullYear()} Season</div>
              <div>Certified Halal & Prime Aged</div>
            </div>
          </div>

          {/* Section 1: Banquet Tiers (if view matches) */}
          {(activeView === 'all' || activeView === 'banquet') && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <Building2 className="w-5 h-5 text-amber-400 print:text-black" />
                <h3 className="font-serif-luxury text-2xl font-bold text-white print:text-black">
                  Banquet & Catering Packages
                </h3>
              </div>

              <div className="space-y-6">
                {cateringPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-xl bg-[#161a24] border border-neutral-800 print:bg-neutral-50 print:border-neutral-300 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 print:text-amber-800">
                          {pkg.tier} Tier
                        </span>
                        <h4 className="font-serif-luxury text-xl font-bold text-white print:text-black">
                          {pkg.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-bold text-amber-400 print:text-black">
                          ${pkg.pricePerPerson}
                        </span>
                        <span className="text-[10px] text-neutral-400 print:text-neutral-600 block">/ guest</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 print:text-neutral-700 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-800 print:border-neutral-200">
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 print:text-neutral-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-700 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Banquet Hall Dimensions & Capacities */}
          {(activeView === 'all' || activeView === 'banquet') && (
            <div className="space-y-4 pt-4">
              <h4 className="font-serif-luxury text-xl font-bold text-white print:text-black border-b border-neutral-800 pb-2">
                Venue Spatial Guide
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {banquetHalls.map(hall => (
                  <div
                    key={hall.id}
                    className="p-4 rounded-lg bg-[#141822] border border-neutral-800 print:bg-neutral-50 print:border-neutral-200 space-y-1.5"
                  >
                    <div className="flex justify-between font-bold text-sm text-white print:text-black">
                      <span>{hall.name}</span>
                      <span className="font-mono text-amber-400 print:text-black">{hall.capacitySeated} Seated</span>
                    </div>
                    <div className="text-xs text-neutral-400 print:text-neutral-600">
                      Dimensions: {hall.dimensions} &bull; Reception: {hall.capacityReception} Guests
                    </div>
                    <div className="text-[11px] text-neutral-400 print:text-neutral-700 italic">
                      {hall.tagline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: A La Carte Hearth Offerings */}
          {(activeView === 'all' || activeView === 'restaurant') && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-400 print:text-black" />
                <h3 className="font-serif-luxury text-2xl font-bold text-white print:text-black">
                  Hearth & Charcoal Degustation Repertoire
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {menuItems.map(item => (
                  <div
                    key={item.id}
                    className="border-b border-neutral-800/80 pb-3 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif-luxury text-base font-bold text-white print:text-black">
                        {item.name}
                      </span>
                      <span className="font-mono font-bold text-amber-400 print:text-black ml-2">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-neutral-400 print:text-neutral-700 leading-relaxed text-[11px]">
                      {item.description}
                    </p>
                    <div className="flex gap-1 text-[9px] text-neutral-500 print:text-neutral-600 uppercase font-mono">
                      <span>{item.category}</span> &bull; <span>{item.dietary.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Dietary, Halal & Allergen Protocol */}
          <div className="p-4 rounded-lg bg-[#141822] border border-neutral-800 print:bg-neutral-100 text-xs text-neutral-300 print:text-neutral-800 space-y-2">
            <h5 className="font-bold text-amber-400 print:text-black uppercase tracking-wider text-[11px]">
              Culinary Protocols & Dietary Assurance
            </h5>
            <p className="leading-relaxed">
              All steaks and kebabs are certified 100% Halal and sourced from certified humane ranches. We utilize dedicated gluten-free preparation stations and can accommodate vegan, kosher-style, and allergen-restricted menus upon advance coordinator notice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
