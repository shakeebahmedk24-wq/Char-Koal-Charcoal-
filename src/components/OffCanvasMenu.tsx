import React, { useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PageId } from '../types/restaurant';
import {
  X,
  Flame,
  Home,
  Users,
  UtensilsCrossed,
  Building2,
  Truck,
  Clock,
  PhoneCall,
  FileText,
  CalendarCheck,
  Sliders,
  Sparkles,
  MapPin,
  ShoppingBag
} from 'lucide-react';

export const OffCanvasMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentPage,
    setCurrentPage,
    setIsClientEditorOpen,
    setIsHostingModalOpen,
    setIsCartDrawerOpen,
    cart
  } = useRestaurant();

  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  // Prevent background body scroll when off-canvas is open and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'about', label: 'About Us', icon: <Users className="w-5 h-5" /> },
    { id: 'menu', label: 'Interactive Menu', icon: <UtensilsCrossed className="w-5 h-5" />, badge: 'Wood-Fired' },
    { id: 'banquet', label: 'Banquet Facility', icon: <Building2 className="w-5 h-5" />, badge: '4 Halls' },
    { id: 'catering', label: 'Artisan Catering', icon: <Truck className="w-5 h-5" /> },
    { id: 'hours', label: 'Visiting Hours', icon: <Clock className="w-5 h-5" /> },
    { id: 'menukit', label: 'Download Menu Kit', icon: <FileText className="w-5 h-5" />, badge: 'PDF' },
    { id: 'contact', label: 'Contact Us & Valet', icon: <MapPin className="w-5 h-5" /> },
    { id: 'booking', label: 'Online Table Booking', icon: <CalendarCheck className="w-5 h-5" />, badge: 'Instant' }
  ];

  const handleNav = (id: PageId) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!isMobileMenuOpen}
    >
      {/* Backdrop overlay */}
      <div
        id="offcanvas-backdrop"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Off-canvas Sliding Drawer with smooth cubic-bezier transition */}
      <div
        id="offcanvas-sidebar-drawer"
        className={`relative w-full max-w-xs sm:max-w-sm h-full bg-[#0d0f13] border-l border-[#232832] flex flex-col shadow-2xl z-10 overflow-y-auto transition-transform duration-350 ease-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1f242d] flex items-center justify-between bg-[#13171f]/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif-luxury text-lg font-bold text-white tracking-widest block leading-tight">
                CHAR-KOAL
              </span>
              <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">
                Hearth &bull; Banquet
              </span>
            </div>
          </div>

          <button
            id="offcanvas-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-[#1b2028] text-neutral-400 hover:text-white border border-neutral-700/60 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="mx-5 my-3.5 px-3 py-2 rounded-md bg-[#161a22] border border-amber-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-300">Kitchen Open Today</span>
          </div>
          <span className="text-amber-400/90 font-mono text-[11px]">12:00 PM – 11:00 PM</span>
        </div>

        {/* Fast Action Buttons */}
        <div className="px-5 pb-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              id="offcanvas-book-btn"
              onClick={() => handleNav('booking')}
              className="py-2.5 px-3 rounded-md bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>

            <a
              id="offcanvas-call-btn"
              href="tel:+15552427562"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md bg-[#181d26] border border-amber-500/40 text-amber-300 font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Hearth</span>
            </a>
          </div>

          <button
            id="offcanvas-cart-btn"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartDrawerOpen(true);
            }}
            className="w-full py-2.5 px-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Table Order & Cart</span>
            {totalCartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-2 space-y-1">
          <p className="px-3 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            Navigation Menu
          </p>

          {navLinks.map((link, idx) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                id={`offcanvas-link-${link.id}`}
                onClick={() => handleNav(link.id)}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${Math.min(idx * 30 + 50, 350)}ms` : '0ms'
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left transition-all duration-300 transform ${
                  isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/30 font-medium'
                    : 'text-neutral-300 hover:text-white hover:bg-[#181d26]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-amber-400' : 'text-neutral-400'}>
                    {link.icon}
                  </span>
                  <span className="text-sm tracking-wide">{link.label}</span>
                </div>
                {link.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-[#212733] text-amber-300/90'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Client Management & Info Footer in Drawer */}
        <div className="p-4 border-t border-[#1f242d] bg-[#0b0d10] space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
            <button
              id="offcanvas-admin-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsClientEditorOpen(true);
              }}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Self-Editor</span>
            </button>

            <button
              id="offcanvas-hosting-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsHostingModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-amber-400 hover:underline transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Estimate</span>
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 text-center leading-relaxed">
            742 Charcoal Avenue, Culinary District &bull; Valet at Front
            <br />
            &copy; {new Date().getFullYear()} Char-Koal. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
