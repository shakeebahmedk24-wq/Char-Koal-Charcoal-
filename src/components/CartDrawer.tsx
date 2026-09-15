import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setCurrentPage,
    showToast
  } = useRestaurant();

  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Close on Escape key & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        setIsCartDrawerOpen(false);
      }
    };

    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  const totalItems = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  const cartSubtotal = cart.reduce((acc, ci) => {
    const priceNum = parseFloat(ci.item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + priceNum * ci.quantity;
  }, 0);

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSent(true);

      const destination = tableNumber.trim() ? `Table ${tableNumber}` : 'your table';
      showToast(`🔥 Order fired! Pitmaster is now preparing your dishes for ${destination}.`);

      setTimeout(() => {
        clearCart();
        setTableNumber('');
        setSpecialInstructions('');
        setOrderSent(false);
        setIsCartDrawerOpen(false);
      }, 1500);
    }, 600);
  };

  const handleBrowseMenu = () => {
    setIsCartDrawerOpen(false);
    setCurrentPage('menu');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ease-in-out ${
        isCartDrawerOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!isCartDrawerOpen}
    >
      {/* Backdrop overlay */}
      <div
        id="cart-drawer-backdrop"
        onClick={() => setIsCartDrawerOpen(false)}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isCartDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Side Sliding Drawer */}
      <aside
        id="cart-side-drawer"
        aria-label="Shopping Cart and Table Order"
        className={`relative w-full max-w-md h-full bg-[#0d0f14] border-l border-[#222834] flex flex-col shadow-2xl z-10 overflow-hidden transition-transform duration-350 ease-out transform ${
          isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#1f242d] flex items-center justify-between bg-[#13171f]/95">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-lg font-bold text-white tracking-wide">
                  Table Order
                </h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
                    {totalItems} {totalItems === 1 ? 'dish' : 'dishes'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">Direct Kitchen & Hearth Dispatch</p>
            </div>
          </div>

          <button
            id="cart-drawer-close-btn"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 rounded-full bg-[#1b2028] text-neutral-400 hover:text-white border border-neutral-700/60 hover:border-neutral-500 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Sent Success State */}
        {orderSent ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">Order Sent to Hearth!</h3>
            <p className="text-sm text-neutral-300 max-w-xs leading-relaxed">
              Our pitmasters have received your selections. Premium live charcoal preparation begins immediately.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. time: 15–20 minutes</span>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
              <Flame className="w-8 h-8 text-neutral-500" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-luxury text-xl font-bold text-white">Your Order is Empty</h3>
              <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                Explore our signature charcoal steaks, hearth flatbreads, and artisan cocktails to begin.
              </p>
            </div>
            <button
              id="cart-empty-browse-menu"
              onClick={handleBrowseMenu}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Cart Items & Form */
          <div className="flex-1 overflow-y-auto flex flex-col justify-between">
            {/* List of Ordered Dishes */}
            <div className="p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1 border-b border-neutral-800">
                <span>Selected Hearth Dishes</span>
                <button
                  onClick={clearCart}
                  className="text-neutral-500 hover:text-rose-400 transition-colors text-[11px] underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-3 divide-y divide-[#1b202a]">
                {cart.map(ci => {
                  const itemPrice = parseFloat(ci.item.price.replace(/[^0-9.]/g, '')) || 0;
                  const itemTotal = (itemPrice * ci.quantity).toFixed(2);

                  return (
                    <div
                      key={ci.item.id}
                      className="pt-3 first:pt-0 flex items-start justify-between gap-3 group"
                    >
                      {/* Dish Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-neutral-800">
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                          {ci.item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mt-0.5">
                          <span>{ci.item.price}</span>
                          <span className="text-neutral-600">&bull;</span>
                          <span className="text-neutral-300 font-sans text-[11px]">
                            Subtotal: ${itemTotal}
                          </span>
                        </div>
                        {ci.item.dietary.length > 0 && (
                          <div className="text-[10px] text-neutral-500 mt-0.5 truncate">
                            {ci.item.dietary.join(', ')}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 bg-[#161a22] border border-neutral-800 rounded-lg p-1 flex-shrink-0">
                        <button
                          onClick={() => updateCartQuantity(ci.item.id, -1)}
                          className="p-1 rounded text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1.5 min-w-[20px] text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(ci.item.id, 1)}
                          className="p-1 rounded text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(ci.item.id)}
                          className="p-1 text-neutral-500 hover:text-rose-400 hover:bg-neutral-800 rounded transition-colors ml-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Browse more shortcut */}
              <div className="pt-2 text-center">
                <button
                  onClick={handleBrowseMenu}
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  + Add more items from menu
                </button>
              </div>
            </div>

            {/* Bottom Checkout & Submission Section */}
            <form
              onSubmit={handleSendOrder}
              className="p-4 sm:p-5 border-t border-[#1f242d] bg-[#11141c] space-y-4 shadow-xl"
            >
              {/* Inputs */}
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] text-neutral-300 font-medium block mb-1">
                    Table Number or Seating Location <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Table 12, Booth 4, or Patio Bar"
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#090b0f] border border-neutral-700/80 focus:border-amber-500 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-300 font-medium block mb-1">
                    Pitmaster Instructions / Allergies (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Medium rare steak, sauce on side"
                    value={specialInstructions}
                    onChange={e => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#090b0f] border border-neutral-700/80 focus:border-amber-500 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-neutral-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-mono text-neutral-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Hearth Preparation & Service</span>
                  <span className="font-mono text-emerald-400">Included</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="font-mono text-lg text-amber-400">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-neutral-950" />
                <span>
                  {isSubmitting ? 'Firing Order...' : 'Send Order to Hearth'}
                </span>
              </button>
            </form>
          </div>
        )}
      </aside>
    </div>
  );
};
