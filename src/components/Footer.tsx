import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PageId } from '../types/restaurant';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Server,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setCurrentPage,
    setIsClientEditorOpen,
    setIsHostingModalOpen,
    showToast
  } = useRestaurant();

  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      showToast('Subscribed to Char-Koal seasonal tasting releases.');
      setEmailInput('');
    }
  };

  const pagesCol1: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home Experience' },
    { id: 'about', label: 'About & Philosophy' },
    { id: 'menu', label: 'Artisanal Charcoal Menu' },
    { id: 'banquet', label: 'Banquet Facility & Halls' },
    { id: 'gallery', label: 'Visual Gallery' }
  ];

  const pagesCol2: { id: PageId; label: string }[] = [
    { id: 'catering', label: 'Bespoke Catering' },
    { id: 'booking', label: 'Online Table Booking' },
    { id: 'hours', label: 'Visiting Hours & Valet' },
    { id: 'menukit', label: 'Download Menu Kit (PDF)' },
    { id: 'contact', label: 'Contact & Location' }
  ];

  return (
    <footer id="main-footer" className="bg-[#090b0e] border-t border-[#1d222b] text-neutral-300 relative z-20">
      {/* Top CTA Banner */}
      <div className="border-b border-[#1d222b] bg-gradient-to-r from-neutral-900/60 via-amber-950/20 to-neutral-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold block mb-1">
              Private Dining & Grand Banquets
            </span>
            <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white tracking-wide">
              Planning a wedding, gala, or corporate milestone?
            </h3>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              From intimate 20-guest wine vault dinners to 450-guest ballroom galas with live charcoal hearth stations.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              id="footer-banquet-inquiry-btn"
              onClick={() => setCurrentPage('banquet')}
              className="flex-1 md:flex-none px-6 py-3 rounded-md bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              Explore Banquet Halls
            </button>
            <button
              id="footer-menukit-btn"
              onClick={() => setCurrentPage('menukit')}
              className="flex-1 md:flex-none px-6 py-3 rounded-md bg-[#161a22] border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 text-xs uppercase tracking-wider transition-colors"
            >
              Get Event Menu Kit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-white block">
                  CHAR-KOAL
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold">
                  Artisanal Hearth & Banquet
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed pr-6">
              Rooted in the primordial mastery of live-fire culinary arts. We burn sustainable Japanese Binchotan and seasoned fruitwoods to achieve unmatched caramelization, tenderness, and smoky depth.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-sm text-neutral-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>742 Charcoal Avenue, Hearth Square, Culinary District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+15552427562" className="hover:text-amber-400 transition-colors font-mono">
                  (555) 242-7562 &bull; Direct Line
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:concierge@char-koal.com" className="hover:text-amber-400 transition-colors">
                  concierge@char-koal.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#1d222b] pb-2">
              Restaurant
            </h4>
            <ul className="space-y-2.5 text-sm">
              {pagesCol1.map(p => (
                <li key={p.id}>
                  <button
                    id={`footer-link-${p.id}`}
                    onClick={() => setCurrentPage(p.id)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500/60" />
                    <span>{p.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#1d222b] pb-2">
              Banquets & Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {pagesCol2.map(p => (
                <li key={p.id}>
                  <button
                    id={`footer-link-${p.id}`}
                    onClick={() => setCurrentPage(p.id)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500/60" />
                    <span>{p.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Self-Edit shortcut */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#1d222b] pb-2">
              VIP Tasting Dispatch
            </h4>
            <p className="text-xs text-neutral-400">
              Receive private invitations to seasonal hearth tastings, sommelier masterclasses, and holiday dining releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                id="footer-email-input"
                type="email"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-3 py-2 text-xs bg-[#141820] border border-neutral-700/80 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
              <button
                id="footer-subscribe-btn"
                type="submit"
                className="w-full py-2 bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe to Dispatch'}
              </button>
            </form>

            <div className="pt-2 border-t border-[#1d222b] space-y-1.5">
              <button
                id="footer-admin-toggle-btn"
                onClick={() => setIsClientEditorOpen(true)}
                className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Client Self-Editor (Menu & Hours)</span>
              </button>
              <button
                id="footer-hosting-toggle-btn"
                onClick={() => setIsHostingModalOpen(true)}
                className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span>Platform & Hosting Cost Estimate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Benchmark Credit */}
        <div className="mt-14 pt-6 border-t border-[#181d26] flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Char-Koal Artisanal Grill & Banquet Facility. All culinary concepts, trademarks & photography reserved.
          </p>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1 text-emerald-400/90">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PCI-DSS Compliant &bull; SSL Secured</span>
            </span>
            <span>Food Safety Grade A+</span>
            <button
              onClick={() => setCurrentPage('contact')}
              className="hover:text-neutral-300 underline transition-colors"
            >
              Accessibility & Dietary Notice
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
