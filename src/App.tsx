import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { OffCanvasMenu } from './components/OffCanvasMenu';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ClientEditorModal } from './components/ClientEditorModal';
import { PlatformHostingModal } from './components/PlatformHostingModal';

// Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Menu } from './pages/Menu';
import { BanquetFacility } from './pages/BanquetFacility';
import { Gallery } from './pages/Gallery';
import { Catering } from './pages/Catering';
import { ContactUs } from './pages/ContactUs';
import { VisitingHours } from './pages/VisitingHours';
import { OnlineBooking } from './pages/OnlineBooking';
import { MenuKit } from './pages/MenuKit';

import {
  Sliders,
  CheckCircle,
  CalendarCheck,
  PhoneCall,
  Flame
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    isClientEditorOpen,
    setIsClientEditorOpen,
    setIsCartDrawerOpen,
    cart,
    toastMessage
  } = useRestaurant();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <AboutUs />;
      case 'menu':
        return <Menu />;
      case 'banquet':
        return <BanquetFacility />;
      case 'gallery':
        return <Gallery />;
      case 'catering':
        return <Catering />;
      case 'contact':
        return <ContactUs />;
      case 'hours':
        return <VisitingHours />;
      case 'booking':
        return <OnlineBooking />;
      case 'menukit':
        return <MenuKit />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e12] text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Mobile Off-Canvas Drawer Navigation */}
      <OffCanvasMenu />

      {/* Side-sliding Cart & Table Order Drawer */}
      <CartDrawer />

      {/* Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Client Editor Modal */}
      <ClientEditorModal />

      {/* Platform & Hosting Cost Breakdown Modal */}
      <PlatformHostingModal />

      {/* Floating Client Editor Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center space-x-2">
        <button
          id="floating-quick-book-btn"
          onClick={() => setCurrentPage('booking')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-2xl hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-amber-400/40"
          title="Instant Table Reservation"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Table</span>
        </button>

        <button
          id="floating-client-editor-btn"
          onClick={() => setIsClientEditorOpen(true)}
          className="p-3 rounded-full bg-[#181d26] hover:bg-[#222936] text-amber-400 border border-amber-500/40 shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group"
          title="Open Client Self-Editing Dashboard (Menu, Prices, Hours)"
        >
          <Sliders className="w-4 h-4" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs text-neutral-200 font-semibold pr-1">
            Edit Menu & Hours
          </span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#161c26] text-white border border-amber-500/60 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs animate-fade-in max-w-[90vw]">
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium tracking-wide">{toastMessage}</span>
          {cart.length > 0 && (
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="ml-2 pl-3 border-l border-neutral-700 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 whitespace-nowrap cursor-pointer"
            >
              View Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainAppContent />
    </RestaurantProvider>
  );
}
