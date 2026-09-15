import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  UtensilsCrossed,
  Flame,
  Search,
  Filter,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ShoppingBag,
  FileDown,
  Sparkles,
  Info,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export const Menu: React.FC = () => {
  const {
    menuItems,
    addToCart,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setCurrentPage,
    setIsCartDrawerOpen,
    showToast
  } = useRestaurant();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'steaks', label: 'Binchotan Steaks' },
    { id: 'kebabs', label: 'Artisan Kebabs' },
    { id: 'seafood', label: 'Embers Seafood' },
    { id: 'appetizers', label: 'Appetizers & Mezze' },
    { id: 'grill', label: 'Pitmaster Cuts' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'drinks', label: 'Smoked Mixology' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const dietaryTags = ['all', 'Chef Special', 'Signature', 'Halal', 'Gluten-Free', 'Vegetarian', 'Spicy'];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchDietary = selectedDietary === 'all' || item.dietary.includes(selectedDietary as any);
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDietary && matchSearch;
    });
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, ci) => {
    const numPrice = parseFloat(ci.item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + numPrice * ci.quantity;
  }, 0);

  const cartTotalItems = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0b0e12]">
      {/* Menu Header */}
      <AnimatedSection className="relative py-16 bg-[#0e1117] border-b border-[#1f242d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>Open-Fire Artisanal Cuisine</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            The Charcoal Hearth Menu
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Every dish is prepared to order using sustainably harvested Japanese Binchotan oak coals, aromatic fruitwoods, and heritage marinades.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setCurrentPage('menukit')}
              className="px-4 py-2 rounded-md bg-[#161a22] border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Printable Menu Kit (PDF)</span>
            </button>

            <button
              onClick={() => setCurrentPage('booking')}
              className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-[#0e1218]/95 backdrop-blur-md border-b border-[#212733] py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          {/* Top Row: Search & Dietary Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search cuts, kebabs, mezze, or ingredients..."
                className="w-full pl-9 pr-4 py-2 bg-[#141820] border border-neutral-700 rounded-md text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Dietary Tags scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mr-1 shrink-0">
                Dietary:
              </span>
              {dietaryTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedDietary(tag)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDietary === tag
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'bg-[#181d26] text-neutral-300 hover:bg-[#202734] border border-neutral-700/60'
                  }`}
                >
                  {tag === 'all' ? 'All Dietary' : tag}
                </button>
              ))}
            </div>

            {/* Floating Order Cart summary button if cart has items */}
            {cartTotalItems > 0 && (
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Order Summary ({cartTotalItems}) &bull; ${cartSubtotal.toFixed(2)}</span>
              </button>
            )}
          </div>

          {/* Bottom Row: Category Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Cards Grid */}
      <AnimatedSection className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-[#12161f] border border-neutral-800 rounded-xl space-y-3">
            <UtensilsCrossed className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white font-serif-luxury">No culinary items matched</h3>
            <p className="text-xs text-neutral-400">
              Try resetting your search query or dietary filter to see all open-hearth creations.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="px-4 py-1.5 bg-amber-500 text-neutral-950 font-bold text-xs uppercase rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {filteredItems.map(item => {
              const inCart = cart.find(ci => ci.item.id === item.id);
              return (
                <div
                  key={item.id}
                  className="group bg-[#12161e] border border-[#202632] hover:border-amber-500/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with badges */}
                  <div className="relative h-32 sm:h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12161e] via-transparent to-transparent" />

                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/85 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[11px] sm:text-sm font-mono font-bold text-amber-400 border border-amber-500/30 shadow-md">
                      {item.price}
                    </div>

                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex flex-wrap gap-1 max-w-[85%]">
                      {item.dietary.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-neutral-950/85 backdrop-blur-sm text-neutral-200 border border-neutral-700/60 font-medium truncate"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-500 font-bold truncate">
                          {item.category}
                        </span>
                        {item.calories && (
                          <span className="hidden sm:inline text-[10px] text-neutral-500 font-mono">{item.calories}</span>
                        )}
                      </div>
                      <h3 className="font-serif-luxury text-sm sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-none">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-300 leading-snug sm:leading-relaxed mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-2 sm:pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2">
                      {inCart ? (
                        <div className="flex items-center justify-between sm:justify-start space-x-1 sm:space-x-2 bg-[#181e28] px-1.5 sm:px-2 py-1 rounded-md border border-amber-500/40 w-full sm:w-auto">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 hover:text-amber-400 text-neutral-300 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="text-[11px] sm:text-xs font-mono font-bold text-white px-1">
                            {inCart.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 hover:text-amber-400 text-neutral-300 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <button
                            onClick={() => setIsCartDrawerOpen(true)}
                            className="ml-1 p-1 text-amber-400 hover:text-amber-300 transition-colors"
                            title="Open cart drawer"
                            aria-label="Open cart drawer"
                          >
                            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            addToCart(item);
                            setIsCartDrawerOpen(true);
                          }}
                          className="w-full sm:w-auto px-2 sm:px-3 py-1.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 active:scale-95 text-amber-300 border border-amber-500/40 text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Order</span>
                        </button>
                      )}

                      <span className="hidden md:inline text-[11px] text-neutral-500 italic">Fresh from Hearth</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
};
