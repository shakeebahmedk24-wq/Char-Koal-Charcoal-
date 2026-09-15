import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { DEFAULT_REVIEWS } from '../data/defaultData';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  Flame,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Building2,
  UtensilsCrossed,
  Sparkles,
  PhoneCall,
  ChevronRight,
  CheckCircle2,
  FileDown
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setCurrentPage, menuItems, banquetHalls, addToCart } = useRestaurant();

  // Quick reservation inputs on hero
  const [quickDate, setQuickDate] = useState(new Date().toISOString().split('T')[0]);
  const [quickTime, setQuickTime] = useState('19:00');
  const [quickGuests, setQuickGuests] = useState('2');

  const featuredDishes = menuItems.filter(m => m.featured).slice(0, 4);

  const handleHeroReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('booking');
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background photo with deep charcoal & ember overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
            alt="Artisanal Charcoal Hearth"
            className="w-full h-full object-cover object-center brightness-[0.38] contrast-[1.15] scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/60 to-[#0a0c0f]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-[0.25em] mb-6 animate-fade-in shadow-[0_0_20px_rgba(217,119,6,0.2)]">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Artisanal Live-Fire Hearth & Grand Banquets</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            The Primordial Fire. <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent italic font-normal">
              Elevated to Gastronomic Art.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-10">
            Charred over sustainably harvested Japanese Binchotan oak coals and fragrant applewood. Experience prime dry-aged steaks, artisan swordsman kebabs, and unforgettable banquet celebrations.
          </p>

          {/* Quick Hero Reservation Widget */}
          <div className="max-w-3xl mx-auto bg-[#13171f]/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-neutral-700/80 shadow-2xl mb-8">
            <form onSubmit={handleHeroReserve} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end text-left">
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={quickDate}
                    onChange={e => setQuickDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0e1117] border border-neutral-700 rounded-md text-xs text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Time Slot
                </label>
                <select
                  value={quickTime}
                  onChange={e => setQuickTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e1117] border border-neutral-700 rounded-md text-xs text-white focus:border-amber-500"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">1:30 PM (Lunch)</option>
                  <option value="18:00">6:00 PM (Dinner)</option>
                  <option value="19:00">7:00 PM (Dinner)</option>
                  <option value="20:00">8:00 PM (Dinner)</option>
                  <option value="21:15">9:15 PM (Late)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Party Size
                </label>
                <select
                  value={quickGuests}
                  onChange={e => setQuickGuests(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e1117] border border-neutral-700 rounded-md text-xs text-white focus:border-amber-500"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests (Table)</option>
                  <option value="4">4 Guests (Booth)</option>
                  <option value="6">6 Guests (Hearth View)</option>
                  <option value="8">8 Guests (Chef Table)</option>
                  <option value="12">12+ Guests (Private Room)</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Find Table</span>
                </button>
              </div>
            </form>
          </div>

          {/* Secondary Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setCurrentPage('menu')}
              className="px-5 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-200 border border-neutral-700 hover:border-amber-500/50 uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Menu</span>
            </button>

            <button
              onClick={() => setCurrentPage('banquet')}
              className="px-5 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-200 border border-neutral-700 hover:border-amber-500/50 uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Banquet Facilities (4 Halls)</span>
            </button>

            <button
              onClick={() => setCurrentPage('menukit')}
              className="px-5 py-2.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Menu Kit Brochure</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE CHAR-KOAL PHILOSOPHY & ARTISANAL HEARTH */}
      <AnimatedSection className="py-20 bg-[#0b0d10] border-t border-b border-[#1f242d] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block">
                The Charcoal Master's Craft
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-wide leading-tight">
                White Oak Binchotan. <br />
                <span className="italic font-normal text-amber-300">
                  Pure Heat, Zero Smoke Impurities.
                </span>
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                At Char-Koal, open fire is not a gimmick — it is the cornerstone of our culinary philosophy. We import authentic Japanese Kishu Binchotan charcoal, known for burning at intense temperatures exceeding 1,000°F without flare-ups, locking in natural juices while imparting an incomparable crystalline crust.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Each cut of 45-day dry-aged Black Angus and every sword of hand-minced Wagyu kebab is calibrated to the millimeter over embers by Pitmasters with decades of fire-tending heritage.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
                <div>
                  <div className="font-serif-luxury text-2xl font-bold text-white">1,000°F</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Hearth Heat</div>
                </div>
                <div>
                  <div className="font-serif-luxury text-2xl font-bold text-white">45 Days</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Dry Aging</div>
                </div>
                <div>
                  <div className="font-serif-luxury text-2xl font-bold text-white">450 Cap</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Grand Banquet</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-amber-300 transition-colors"
                >
                  <span>Discover Our Heritage & Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80"
                  alt="Grill Skewers"
                  className="rounded-lg object-cover w-full h-56 border border-neutral-800 shadow-xl hover:scale-[1.02] transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
                  alt="Dining Interior"
                  className="rounded-lg object-cover w-full h-72 border border-neutral-800 shadow-xl hover:scale-[1.02] transition-transform"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"
                  alt="Prime Tomahawk"
                  className="rounded-lg object-cover w-full h-72 border border-neutral-800 shadow-xl hover:scale-[1.02] transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80"
                  alt="Charred Octopus"
                  className="rounded-lg object-cover w-full h-56 border border-neutral-800 shadow-xl hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. SIGNATURE CULINARY HIGHLIGHTS */}
      <AnimatedSection className="py-20 bg-[#0d0f12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                Gastronomic Creations
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                Signature Hearth Offerings
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('menu')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-amber-300 transition-colors"
            >
              <span>View Full Interactive Menu</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {featuredDishes.map(dish => (
              <div
                key={dish.id}
                className="group bg-[#13171f] border border-[#212733] rounded-xl overflow-hidden shadow-lg hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-32 sm:h-52 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-neutral-950/85 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[11px] sm:text-xs font-mono font-bold text-amber-400 border border-amber-500/30">
                    {dish.price}
                  </div>
                  <div className="absolute bottom-2 left-2 sm:left-3 flex flex-wrap gap-1 max-w-[85%]">
                    {dish.dietary.slice(0, 2).map((d, i) => (
                      <span
                        key={i}
                        className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-neutral-300 border border-white/10 truncate"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    <h3 className="font-serif-luxury text-sm sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-2 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <span className="hidden sm:inline text-[11px] text-neutral-500 font-mono">{dish.calories}</span>
                    <button
                      onClick={() => addToCart(dish)}
                      className="w-full sm:w-auto text-[10px] sm:text-xs text-amber-400 hover:text-white font-medium flex items-center justify-center sm:justify-start gap-1 py-1 sm:py-0 transition-colors cursor-pointer"
                    >
                      <span className="sm:hidden">Order</span>
                      <span className="hidden sm:inline">Order to Table</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. BANQUET FACILITY TEASER */}
      <AnimatedSection className="py-20 bg-[#090b0e] border-t border-[#1f242d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Premier Banquet & Private Dining</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Architectural Spaces for Unrivaled Celebrations.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Whether orchestrating a 450-guest high-society wedding reception or an executive dinner in our 2,000-bottle wine cellar, Char-Koal offers four distinct venues equipped with commercial audio-visual staging and bespoke banquet kitchens.
              </p>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Private VIP bridal suites, speaker green rooms, and dedicated service foyers.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dual 4K laser projection, concert-grade acoustic engineering.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Customizable live-fire banquet stations with Master Pitmasters.</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setCurrentPage('banquet')}
                  className="px-6 py-3 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Explore Banquet Halls
                </button>
                <button
                  onClick={() => setCurrentPage('menukit')}
                  className="px-5 py-3 rounded-md bg-[#161b24] hover:bg-[#1d232f] border border-neutral-700 text-neutral-200 text-xs uppercase tracking-wider transition-colors"
                >
                  Download Event Kit
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {banquetHalls.slice(0, 2).map(hall => (
                <div
                  key={hall.id}
                  onClick={() => setCurrentPage('banquet')}
                  className="group bg-[#12161f] border border-[#232936] rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/60 transition-all shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hall.image}
                      alt={hall.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1016] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-mono text-amber-300 font-bold">{hall.capacitySeated} Seated</span>
                      <span className="text-neutral-400">{hall.dimensions}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {hall.name}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2">{hall.tagline}</p>
                    <div className="text-[11px] text-amber-400/90 font-medium pt-1 flex items-center gap-1">
                      <span>View Specifications & Floorplan</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. GUEST REVIEWS & REPUTATION */}
      <AnimatedSection className="py-20 bg-[#0c0e12] border-t border-[#1a1f29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Guest Accolades
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-12">
            Praised by Epicures & Connoisseurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {DEFAULT_REVIEWS.map(r => (
              <div
                key={r.id}
                className="p-6 rounded-xl bg-[#13171f] border border-[#212733] flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                      {r.source}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">
                    "{r.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-neutral-800">
                  <img
                    src={r.avatar}
                    alt={r.author}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{r.author}</h4>
                    <span className="text-[11px] text-neutral-500">{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. INSTANT CALL-TO-ACTION & DIRECT DIAL */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40 border-t border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Secure Your Table by the Embers
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            Experience our open-flame tasting menu or celebrate your most important milestone in our grand banquet halls.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentPage('booking')}
              className="px-8 py-3.5 rounded-md bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Book Table Online
            </button>

            <a
              href="tel:+15552427562"
              className="px-6 py-3.5 rounded-md bg-[#161a22] border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Tap to Call (555) 242-7562</span>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
