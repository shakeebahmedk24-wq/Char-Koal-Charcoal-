import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PageId } from '../types/restaurant';
import {
  Flame,
  Phone,
  Calendar,
  Menu as MenuIcon,
  ShoppingCart,
  ShoppingBag,
  Sliders,
  Clock,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setIsMobileMenuOpen,
    setIsClientEditorOpen,
    setIsHostingModalOpen,
    setIsCartDrawerOpen,
    cart
  } = useRestaurant();

  const [scrolled, setScrolled] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  const mainNavItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Menu' },
    { id: 'banquet', label: 'Banquet Facility' },
    { id: 'catering', label: 'Catering' },
  ];

  const secondaryNavItems: { id: PageId; label: string; desc: string }[] = [
    { id: 'hours', label: 'Visiting Hours', desc: 'Lunch, dinner & holiday timings' },
    { id: 'menukit', label: 'Menu Kit', desc: 'Downloadable banquet & event brochure' },
    { id: 'contact', label: 'Contact Us', desc: 'Location, valet & direct inquiries' },
    { id: 'booking', label: 'Online Booking', desc: 'Instant table reservation engine' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0f12]/95 backdrop-blur-md shadow-2xl border-b border-[#23272f] py-3'
          : 'bg-gradient-to-b from-[#0a0c0f]/90 via-[#0d0f12]/70 to-transparent py-4 md:py-5'
      }`}
    >
      {/* Top micro bar for quick contacts */}
      <div className="hidden lg:block border-b border-white/5 pb-2 mb-2 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-amber-400/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse" />
              Open Today: 12:00 PM – 11:00 PM
            </span>
            <span className="text-neutral-500">|</span>
            <span>Valet Parking Available &bull; Michelin Selected Chef</span>
          </div>

          <div className="flex items-center space-x-5">
            <button
              id="nav-platform-estimate-btn"
              onClick={() => setIsHostingModalOpen(true)}
              className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="View Platform & Hosting Architecture Cost Estimate"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Platform & Hosting Estimate
            </button>
            <span className="text-neutral-600">&bull;</span>
            <button
              id="nav-admin-editor-btn"
              onClick={() => setIsClientEditorOpen(true)}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Self-Editor</span>
            </button>
            <span className="text-neutral-600">&bull;</span>
            <a
              id="nav-top-phone"
              href="tel:+15552427562"
              className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(555) 242-7562</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-600/30 to-amber-900/40 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:border-amber-400 transition-all">
            <Flame className="w-5 h-5 text-amber-400 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="font-serif-luxury text-2xl font-bold tracking-[0.15em] text-white flex items-center gap-1.5">
              <span>CHAR-KOAL</span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-medium">
              Hearth &bull; Grill &bull; Banquet
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {mainNavItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-200 rounded-md cursor-pointer ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* More Dropdown (Hours, Menu Kit, Contact) */}
          <div className="relative">
            <button
              id="nav-dropdown-more-btn"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              className="px-3 py-2 text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-white hover:bg-white/5 rounded-md flex items-center gap-1 cursor-pointer"
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#14181f] border border-neutral-700/70 rounded-lg shadow-2xl p-2 z-50">
                {secondaryNavItems.map(s => (
                  <button
                    key={s.id}
                    id={`nav-dropdown-${s.id}`}
                    onClick={() => {
                      setCurrentPage(s.id);
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div className="text-sm font-medium text-white group-hover:text-amber-400">
                      {s.label}
                    </div>
                    <div className="text-xs text-neutral-400">{s.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Cart / Order toggle - opens side cart drawer */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="View Cart & Table Order"
            aria-label={`View Cart & Table Order (${totalCartCount} items)`}
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Book Table Primary CTA */}
          <button
            id="nav-cta-booking"
            onClick={() => setCurrentPage('booking')}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(217,119,6,0.3)] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-950" />
            <span>Book a Table</span>
          </button>

          {/* Off-Canvas Navigation Drawer Trigger */}
          <button
            id="mobile-offcanvas-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2.5 rounded-md bg-[#181d24] border border-neutral-700/80 text-white hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Open off-canvas navigation menu"
            title="Open navigation menu"
          >
            <MenuIcon className="w-5 h-5 sm:w-5 sm:h-5 text-amber-400" />
            <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Menu
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
