import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  Truck,
  Flame,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  PhoneCall,
  Send,
  FileDown,
  Calculator
} from 'lucide-react';

export const Catering: React.FC = () => {
  const { cateringPackages, setCurrentPage, showToast } = useRestaurant();

  const [selectedTier, setSelectedTier] = useState<string>('c2'); // Gold default
  const [guestCount, setGuestCount] = useState<number>(50);
  const [includeLiveGrillStation, setIncludeLiveGrillStation] = useState<boolean>(true);
  const [includeSommelierPairing, setIncludeSommelierPairing] = useState<boolean>(false);

  // Catering form
  const [catName, setCatName] = useState('');
  const [catEmail, setCatEmail] = useState('');
  const [catPhone, setCatPhone] = useState('');
  const [catDate, setCatDate] = useState('');
  const [catLocation, setCatLocation] = useState('');
  const [catSubmitted, setCatSubmitted] = useState(false);

  const currentPkg = cateringPackages.find(p => p.id === selectedTier) || cateringPackages[1];

  const basePricePerPerson = currentPkg.pricePerPerson;
  const foodTotal = basePricePerPerson * guestCount;
  const liveGrillFee = includeLiveGrillStation ? 650 : 0;
  const sommelierFee = includeSommelierPairing ? guestCount * 30 : 0;
  const estimatedTotal = foodTotal + liveGrillFee + sommelierFee;

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCatSubmitted(true);
    showToast(`Catering request submitted for ${guestCount} guests (${currentPkg.name}). Our events director will contact you.`);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header */}
      <AnimatedSection as="section" direction="fade" duration={800} className="relative py-20 bg-[#0d1015] border-b border-[#1f242d] text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=80"
            alt="Catering grill"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Truck className="w-3.5 h-3.5" />
            <span>Off-Premise & Estate Live-Fire Catering</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-6">
            Bring the Charcoal Hearth to Your Venue
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            From luxury wedding estates and rooftop galas to corporate celebrations. We deploy mobile Binchotan charcoal hearths and Master Pitmasters directly to your location.
          </p>
        </div>
      </AnimatedSection>

      {/* Interactive Catering Cost Calculator */}
      <AnimatedSection as="section" direction="up" delay={80} className="py-16 bg-[#10141c] border-b border-[#212734]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#141822] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Catering Quote Estimator</span>
                </div>
                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                  Estimate Your Bespoke Event
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-neutral-400 block">Estimated Package Investment</span>
                <span className="text-3xl font-mono font-bold text-amber-400">
                  ${estimatedTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-500 block">
                  (${(estimatedTotal / guestCount).toFixed(0)} per person)
                </span>
              </div>
            </div>

            {/* Step 1: Select Tier */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                1. Select Culinary Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cateringPackages.map(pkg => {
                  const isSelected = selectedTier === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedTier(pkg.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1e2533] border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                          : 'bg-[#12161f] border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          {pkg.tier}
                        </span>
                        <span className="text-sm font-mono font-bold text-white">
                          ${pkg.pricePerPerson} / guest
                        </span>
                      </div>
                      <h4 className="font-serif-luxury text-base font-bold text-white mb-2">{pkg.name}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{pkg.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider text-neutral-400 font-bold">
                  2. Number of Guests
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="350"
                step="5"
                value={guestCount}
                onChange={e => setGuestCount(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>15 Guests (Min)</span>
                <span>100 Guests</span>
                <span>200 Guests</span>
                <span>350+ Guests</span>
              </div>
            </div>

            {/* Step 3: Experiential Add-Ons */}
            <div className="space-y-3 pt-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                3. Live Experiential Add-Ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#11141c] border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={includeLiveGrillStation}
                      onChange={e => setIncludeLiveGrillStation(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Mobile Hearth Station & Pitmaster Setup
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Live open-flame cooking equipment, ventilation shield & 2 Pitmasters
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">+$650</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#11141c] border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={includeSommelierPairing}
                      onChange={e => setIncludeSommelierPairing(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Sommelier Wine Pairing Service
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Curated cellar vintages matched to each course tableside
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">+$30/guest</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Package Inclusions Detailed Cards */}
      <AnimatedSection as="section" direction="up" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold block mb-2">
            Detailed Menus
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Catering Package Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cateringPackages.map((pkg, idx) => (
            <AnimatedSection
              as="div"
              direction="up"
              delay={idx * 100}
              key={pkg.id}
              className={`p-6 sm:p-8 rounded-2xl bg-[#12161f] border flex flex-col justify-between space-y-6 ${
                pkg.popular
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-2xl relative'
                  : 'border-neutral-800'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {pkg.tier} Tier
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1 mb-2">{pkg.name}</h3>
                <div className="text-2xl font-mono font-bold text-amber-400 mb-4">
                  ${pkg.pricePerPerson} <span className="text-xs text-neutral-400 font-sans">/ guest</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">{pkg.description}</p>

                <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                    Package Inclusions:
                  </span>
                  {pkg.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setSelectedTier(pkg.id);
                    const el = document.getElementById('catering-inquiry-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Select This Package
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* Catering Inquiry Form */}
      <AnimatedSection as="section" id="catering-inquiry-form" direction="up" className="py-16 bg-[#0c0e12] border-t border-[#1d222b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#141822] border border-neutral-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400">
                Bespoke Off-Premise Planning
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold text-white">
                Book Catering for Your Next Event
              </h3>
              <p className="text-xs text-neutral-400">
                Receive an itemized quote, tasting itinerary, and site logistics plan.
              </p>
            </div>

            {catSubmitted ? (
              <div className="p-8 text-center bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-serif-luxury">
                  Catering Request Confirmed
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you, {catName}. We have logged your request for <strong>{guestCount} guests</strong> ({currentPkg.name}). Our off-premise coordinator will connect with you within 24 hours.
                </p>
                <button
                  onClick={() => setCatSubmitted(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleCateringSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={catName}
                      onChange={e => setCatName(e.target.value)}
                      placeholder="e.g. Jonathan Mercer"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={catEmail}
                      onChange={e => setCatEmail(e.target.value)}
                      placeholder="jonathan@example.com"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={catPhone}
                      onChange={e => setCatPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Event Date</label>
                    <input
                      type="date"
                      value={catDate}
                      onChange={e => setCatDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Event Location / Venue</label>
                    <input
                      type="text"
                      value={catLocation}
                      onChange={e => setCatLocation(e.target.value)}
                      placeholder="e.g. Private Estate, Napa"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Catering Proposal (${estimatedTotal.toLocaleString()})</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
