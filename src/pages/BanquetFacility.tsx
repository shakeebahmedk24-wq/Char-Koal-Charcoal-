import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { BanquetHall } from '../types/restaurant';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  Building2,
  Users,
  Maximize,
  Sparkles,
  CheckCircle2,
  FileDown,
  CalendarCheck,
  Music,
  Tv,
  Wine,
  PhoneCall,
  Send,
  HelpCircle
} from 'lucide-react';

export const BanquetFacility: React.FC = () => {
  const { banquetHalls, setCurrentPage, showToast } = useRestaurant();

  const [guestCountFilter, setGuestCountFilter] = useState<number>(100);
  const [selectedHallForRFP, setSelectedHallForRFP] = useState<string>('The Grand Ember Ballroom');

  // RFP Form State
  const [rfpName, setRfpName] = useState('');
  const [rfpEmail, setRfpEmail] = useState('');
  const [rfpPhone, setRfpPhone] = useState('');
  const [rfpDate, setRfpDate] = useState('');
  const [rfpEventType, setRfpEventType] = useState('Wedding Reception');
  const [rfpNotes, setRfpNotes] = useState('');
  const [rfpSubmitted, setRfpSubmitted] = useState(false);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfpSubmitted(true);
    showToast(`Banquet inquiry received for ${selectedHallForRFP}! Our event director will reach out within 24 hours.`);
  };

  const amenities = [
    {
      icon: <Tv className="w-5 h-5 text-amber-400" />,
      title: 'State-of-the-Art A/V & Laser Projection',
      desc: 'Dual 4K laser projectors, automated motorized screens, wireless Shure microphones, and seamless HDMI/Apple AirPlay connectivity.'
    },
    {
      icon: <Music className="w-5 h-5 text-amber-400" />,
      title: 'Acoustic Architecture & Mood Lighting',
      desc: 'Tuned sound baffle arrays and customizable DMX ember lighting zones tailored for speeches, dance floors, and dinner ambiance.'
    },
    {
      icon: <Wine className="w-5 h-5 text-amber-400" />,
      title: 'Dedicated Satellite Banquet Kitchen',
      desc: 'Independent 2,400 sq. ft. satellite culinary galley ensuring multi-course menus arrive blazing hot and synchronized.'
    },
    {
      icon: <Users className="w-5 h-5 text-amber-400" />,
      title: 'VIP Green Suite & Bridal Sanctuary',
      desc: 'Private secure lounge with en-suite marble bath, lighted vanity mirrors, champagne service, and garment staging.'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Hero Header */}
      <AnimatedSection as="section" direction="fade" duration={800} className="relative py-20 bg-[#0d1015] border-b border-[#1f242d] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
            alt="Banquet ballroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Unrivaled Grand Banquets & Private Dining</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-6">
            Four Distinct Architectural Venues
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            From regal wedding galas of 450 guests to confidential executive cellar meetings. Discover spaces engineered for extraordinary dining, acoustics, and hospitality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="#banquet-rfp"
              className="px-6 py-3 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              Request Event Proposal (RFP)
            </a>
            <button
              onClick={() => setCurrentPage('menukit')}
              className="px-5 py-3 rounded-md bg-[#171c26] hover:bg-[#202736] border border-neutral-700 text-neutral-200 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Download Banquet Menu Kit</span>
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Capacity Recommendation Tool */}
      <AnimatedSection as="section" direction="up" delay={100} className="py-12 bg-[#10141c] border-b border-[#212734]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#141924] border border-amber-500/20 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Capacity Calculator
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                How many guests are you celebrating with?
              </h3>
              <p className="text-xs text-neutral-400">
                Slide to find the perfectly scaled venue for your guest count.
              </p>
            </div>

            <div className="w-full md:w-80 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Guest Count:</span>
                <span className="font-mono font-bold text-amber-400 text-base">{guestCountFilter} Guests</span>
              </div>
              <input
                type="range"
                min="10"
                max="450"
                step="10"
                value={guestCountFilter}
                onChange={e => setGuestCountFilter(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>10 (Cellar)</span>
                <span>100 (Pavilion)</span>
                <span>200 (Terrace)</span>
                <span>450 (Ballroom)</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Venues Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {banquetHalls.map((hall, idx) => {
          const isRecommended =
            guestCountFilter <= hall.capacityReception &&
            (idx === 0
              ? guestCountFilter > 140
              : idx === 1
              ? guestCountFilter > 35 && guestCountFilter <= 140
              : idx === 2
              ? guestCountFilter <= 35
              : guestCountFilter > 90 && guestCountFilter <= 200);

          return (
            <AnimatedSection
              as="div"
              direction="up"
              delay={idx * 120}
              key={hall.id}
              className={`rounded-2xl border bg-[#12161f] overflow-hidden transition-all duration-300 shadow-2xl ${
                isRecommended
                  ? 'border-amber-500 ring-2 ring-amber-500/20'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Photo column */}
                <div className="lg:col-span-6 relative min-h-[340px]">
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-transparent to-transparent lg:hidden" />
                  {isRecommended && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended for {guestCountFilter} Guests</span>
                    </div>
                  )}
                  {hall.basePricing && (
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-amber-300 border border-amber-500/30">
                      {hall.basePricing}
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                        Venue Hall #{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded">
                        {hall.dimensions}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
                      {hall.name}
                    </h3>
                    <p className="text-xs text-amber-300/90 italic mb-4 font-light">
                      {hall.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                      {hall.description}
                    </p>

                    {/* Capacity Pills */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#181e28] border border-neutral-700/60 mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                          Seated Plated Dining
                        </span>
                        <span className="text-base font-bold font-mono text-white">
                          Up to {hall.capacitySeated} Guests
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                          Cocktail Reception
                        </span>
                        <span className="text-base font-bold font-mono text-amber-400">
                          Up to {hall.capacityReception} Guests
                        </span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                        Included Venue Amenities:
                      </span>
                      {hall.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setSelectedHallForRFP(hall.name);
                        const el = document.getElementById('banquet-rfp');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                    >
                      Inquire for this Hall
                    </button>

                    <a
                      href="tel:+15552427562"
                      className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Speak with Director: (555) 242-7562</span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </section>

      {/* Technical & Production Amenities */}
      <AnimatedSection as="section" direction="up" className="py-16 bg-[#0e1218] border-t border-b border-[#1f2530]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Full-Service Infrastructure
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Banquet Amenities & Staging
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#141822] border border-[#232936] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-white font-serif-luxury">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Banquet Inquiry / RFP Form */}
      <AnimatedSection as="section" id="banquet-rfp" direction="up" className="py-20 bg-[#090b0e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#12161f] border border-neutral-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400">
                Direct Event Proposal
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold text-white">
                Request a Banquet Consultation & Date Hold
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Our Banquet Director will review your specifications and furnish an itemized floor plan, tasting itinerary, and proposal within 24 hours.
              </p>
            </div>

            {rfpSubmitted ? (
              <div className="p-8 text-center bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-serif-luxury">
                  Banquet Proposal Request Submitted
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you, {rfpName}. Our Banquet Director has received your event request for{' '}
                  <strong>{selectedHallForRFP}</strong> on {rfpDate || 'your requested date'}.
                </p>
                <button
                  onClick={() => setRfpSubmitted(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={rfpName}
                      onChange={e => setRfpName(e.target.value)}
                      placeholder="e.g. Katherine Sterling"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={rfpEmail}
                      onChange={e => setRfpEmail(e.target.value)}
                      placeholder="katherine@example.com"
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
                      value={rfpPhone}
                      onChange={e => setRfpPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Target Event Date</label>
                    <input
                      type="date"
                      value={rfpDate}
                      onChange={e => setRfpDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Event Type</label>
                    <select
                      value={rfpEventType}
                      onChange={e => setRfpEventType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    >
                      <option value="Wedding Reception">Wedding Reception</option>
                      <option value="Corporate Gala">Corporate Gala / Summit</option>
                      <option value="Milestone Birthday">Milestone Birthday / Anniversary</option>
                      <option value="Rehearsal Dinner">Rehearsal Dinner</option>
                      <option value="Charity Fundraiser">Charity Fundraiser</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-300 block mb-1">Preferred Banquet Hall</label>
                  <select
                    value={selectedHallForRFP}
                    onChange={e => setSelectedHallForRFP(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  >
                    {banquetHalls.map(h => (
                      <option key={h.id} value={h.name}>
                        {h.name} ({h.capacitySeated} Seated / {h.capacityReception} Reception)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-300 block mb-1">
                    Event Vision, Menu Requests & Estimated Guest Count
                  </label>
                  <textarea
                    rows={3}
                    value={rfpNotes}
                    onChange={e => setRfpNotes(e.target.value)}
                    placeholder="Tell us about your theme, live hearth grill stations, bar requirements, or preferred schedule..."
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Banquet RFP Inquiry</span>
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
