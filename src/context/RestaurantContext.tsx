import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  BanquetHall,
  GalleryItem,
  VisitingHourDay,
  Reservation,
  PageId,
  CateringPackage
} from '../types/restaurant';
import {
  DEFAULT_MENU_ITEMS,
  DEFAULT_BANQUET_HALLS,
  DEFAULT_GALLERY,
  DEFAULT_VISITING_HOURS,
  DEFAULT_CATERING_PACKAGES
} from '../data/defaultData';

interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

interface RestaurantContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  menuItems: MenuItem[];
  banquetHalls: BanquetHall[];
  galleryItems: GalleryItem[];
  visitingHours: VisitingHourDay[];
  cateringPackages: CateringPackage[];
  reservations: Reservation[];
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isClientEditorOpen: boolean;
  setIsClientEditorOpen: (open: boolean) => void;
  isHostingModalOpen: boolean;
  setIsHostingModalOpen: (open: boolean) => void;
  selectedMenuItem: MenuItem | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  // Reservation actions
  addReservation: (res: Omit<Reservation, 'id' | 'createdAt'>) => Reservation;
  // Cart actions
  addToCart: (item: MenuItem, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  // Client self-editing actions
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  updateBanquetHall: (hall: BanquetHall) => void;
  updateVisitingHour: (day: string, lunch: string, dinner: string, status: 'open' | 'special' | 'closed') => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  resetToDefaults: () => void;
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

function safeGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved);
  } catch (err) {
    console.warn(`Could not read storage key "${key}":`, err);
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`Could not save storage key "${key}":`, err);
  }
}

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageId>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isClientEditorOpen, setIsClientEditorOpen] = useState(false);
  const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persistent or default data safely
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() =>
    safeGet('charkoal_menu', DEFAULT_MENU_ITEMS)
  );

  const [banquetHalls, setBanquetHalls] = useState<BanquetHall[]>(() =>
    safeGet('charkoal_banquet', DEFAULT_BANQUET_HALLS)
  );

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    safeGet('charkoal_gallery', DEFAULT_GALLERY)
  );

  const [visitingHours, setVisitingHours] = useState<VisitingHourDay[]>(() =>
    safeGet('charkoal_hours', DEFAULT_VISITING_HOURS)
  );

  const [cateringPackages] = useState<CateringPackage[]>(DEFAULT_CATERING_PACKAGES);

  const [reservations, setReservations] = useState<Reservation[]>(() =>
    safeGet('charkoal_reservations', [])
  );

  const [cart, setCart] = useState<CartItem[]>(() =>
    safeGet('charkoal_cart', [])
  );

  // Sync to localStorage safely
  useEffect(() => {
    safeSet('charkoal_menu', menuItems);
  }, [menuItems]);

  useEffect(() => {
    safeSet('charkoal_banquet', banquetHalls);
  }, [banquetHalls]);

  useEffect(() => {
    safeSet('charkoal_gallery', galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    safeSet('charkoal_hours', visitingHours);
  }, [visitingHours]);

  useEffect(() => {
    safeSet('charkoal_reservations', reservations);
  }, [reservations]);

  useEffect(() => {
    safeSet('charkoal_cart', cart);
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setCurrentPage = (page: PageId) => {
    setCurrentPageState(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addReservation = (res: Omit<Reservation, 'id' | 'createdAt'>): Reservation => {
    const newRes: Reservation = {
      ...res,
      id: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [newRes, ...prev]);
    showToast(`Table confirmed! Reservation ID #${newRes.id}`);
    return newRes;
  };

  const addToCart = (item: MenuItem, notes?: string) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1, notes: notes || ci.notes } : ci
        );
      }
      return [...prev, { item, quantity: 1, notes }];
    });
    showToast(`Added "${item.name}" to your order.`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(ci => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(m => (m.id === item.id ? item : m)));
    showToast(`Menu item "${item.name}" updated successfully.`);
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: 'm_' + Date.now()
    };
    setMenuItems(prev => [newItem, ...prev]);
    showToast(`New dish "${item.name}" added to menu.`);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
    showToast('Menu item removed.');
  };

  const updateBanquetHall = (hall: BanquetHall) => {
    setBanquetHalls(prev => prev.map(h => (h.id === hall.id ? hall : h)));
    showToast(`Banquet hall "${hall.name}" details updated.`);
  };

  const updateVisitingHour = (day: string, lunch: string, dinner: string, status: 'open' | 'special' | 'closed') => {
    setVisitingHours(prev =>
      prev.map(h => (h.day === day ? { ...h, lunch, dinner, status } : h))
    );
    showToast(`Hours for ${day} updated.`);
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newG: GalleryItem = {
      ...item,
      id: 'g_' + Date.now()
    };
    setGalleryItems(prev => [newG, ...prev]);
    showToast('Photo added to gallery.');
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    showToast('Photo removed from gallery.');
  };

  const resetToDefaults = () => {
    localStorage.removeItem('charkoal_menu');
    localStorage.removeItem('charkoal_banquet');
    localStorage.removeItem('charkoal_gallery');
    localStorage.removeItem('charkoal_hours');
    setMenuItems(DEFAULT_MENU_ITEMS);
    setBanquetHalls(DEFAULT_BANQUET_HALLS);
    setGalleryItems(DEFAULT_GALLERY);
    setVisitingHours(DEFAULT_VISITING_HOURS);
    showToast('Restaurant data restored to default.');
  };

  return (
    <RestaurantContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        menuItems,
        banquetHalls,
        galleryItems,
        visitingHours,
        cateringPackages,
        reservations,
        cart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isClientEditorOpen,
        setIsClientEditorOpen,
        isHostingModalOpen,
        setIsHostingModalOpen,
        selectedMenuItem,
        setSelectedMenuItem,
        addReservation,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        updateBanquetHall,
        updateVisitingHour,
        addGalleryItem,
        deleteGalleryItem,
        resetToDefaults,
        toastMessage,
        showToast
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
