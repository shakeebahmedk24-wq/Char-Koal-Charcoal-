import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, BanquetHall, VisitingHourDay } from '../types/restaurant';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  RotateCcw,
  Download,
  Sliders,
  UtensilsCrossed,
  Clock,
  Building2,
  CalendarCheck,
  Image as ImageIcon
} from 'lucide-react';

export const ClientEditorModal: React.FC = () => {
  const {
    isClientEditorOpen,
    setIsClientEditorOpen,
    menuItems,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    visitingHours,
    updateVisitingHour,
    banquetHalls,
    updateBanquetHall,
    reservations,
    resetToDefaults,
    showToast
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'menu' | 'hours' | 'banquet' | 'reservations'>('menu');
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isAddingMenu, setIsAddingMenu] = useState(false);

  // Form states for new menu item
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('$');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('grill');
  const [newItemImage, setNewItemImage] = useState('');

  if (!isClientEditorOpen) return null;

  const handleSaveMenuEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMenuItem) {
      updateMenuItem(editingMenuItem);
      setEditingMenuItem(null);
    }
  };

  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    addMenuItem({
      name: newItemName,
      price: newItemPrice,
      description: newItemDesc || 'Prepared fresh over glowing charcoal hearth embers.',
      category: newItemCategory,
      dietary: ['Chef Special'],
      image: newItemImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      featured: false
    });
    setIsAddingMenu(false);
    setNewItemName('');
    setNewItemPrice('$');
    setNewItemDesc('');
  };

  const handleExportJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      restaurant: 'Char-Koal Charcoal Grill & Banquet',
      menu: menuItems,
      hours: visitingHours,
      banquetHalls: banquetHalls,
      reservations: reservations
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `charkoal-content-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Exported content package for backup & WordPress migration.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        id="client-editor-panel"
        className="bg-[#11141a] border border-[#262c37] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#232934] flex items-center justify-between bg-[#151922]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Client Self-Editing Dashboard
              </h3>
              <p className="text-xs text-neutral-400">
                Update menu dishes, prices, banquet details, and visiting hours in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 rounded-md bg-[#1e2430] hover:bg-[#272f3f] border border-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download full restaurant data JSON"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Content</span>
            </button>
            <button
              onClick={() => setIsClientEditorOpen(false)}
              className="p-2 rounded-lg bg-[#1e2430] hover:bg-[#272f3f] text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#232934] bg-[#0d1015] px-5 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Menu Items ({menuItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'hours'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Visiting Hours</span>
          </button>
          <button
            onClick={() => setActiveTab('banquet')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'banquet'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Banquet Halls ({banquetHalls.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reservations Log ({reservations.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          {/* TAB 1: MENU EDITOR */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Menu Management</h4>
                  <p className="text-xs text-neutral-400">Edit titles, descriptions, and pricing directly.</p>
                </div>
                <button
                  onClick={() => setIsAddingMenu(!isAddingMenu)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Add New Dish Form */}
              {isAddingMenu && (
                <form
                  onSubmit={handleCreateMenuItem}
                  className="p-4 rounded-lg bg-[#181d26] border border-amber-500/30 space-y-3"
                >
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Add New Culinary Item
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Item Title</label>
                      <input
                        type="text"
                        required
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                        placeholder="e.g. Hearth Smoked Duck Breast"
                        className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Price</label>
                      <input
                        type="text"
                        required
                        value={newItemPrice}
                        onChange={e => setNewItemPrice(e.target.value)}
                        placeholder="$45"
                        className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Category</label>
                      <select
                        value={newItemCategory}
                        onChange={e => setNewItemCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                      >
                        <option value="grill">Charcoal Grill</option>
                        <option value="steaks">Steaks & Cuts</option>
                        <option value="kebabs">Artisan Kebabs</option>
                        <option value="seafood">Seafood</option>
                        <option value="appetizers">Appetizers & Mezze</option>
                        <option value="vegetarian">Vegetarian / Vegan</option>
                        <option value="drinks">Cocktails & Mocktails</option>
                        <option value="desserts">Desserts</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newItemDesc}
                      onChange={e => setNewItemDesc(e.target.value)}
                      placeholder="Artisanal preparation notes, glaze, spices, wood used..."
                      className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      value={newItemImage}
                      onChange={e => setNewItemImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingMenu(false)}
                      className="px-3 py-1.5 bg-[#202632] text-xs text-neutral-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded"
                    >
                      Save Item
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Modal Popup if editing an existing item */}
              {editingMenuItem && (
                <form
                  onSubmit={handleSaveMenuEdit}
                  className="p-4 rounded-lg bg-[#1a202a] border border-amber-400/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Editing: {editingMenuItem.name}
                    </h5>
                    <button
                      type="button"
                      onClick={() => setEditingMenuItem(null)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={editingMenuItem.name}
                        onChange={e => setEditingMenuItem({ ...editingMenuItem, name: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Price</label>
                      <input
                        type="text"
                        value={editingMenuItem.price}
                        onChange={e => setEditingMenuItem({ ...editingMenuItem, price: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingMenuItem.description}
                      onChange={e => setEditingMenuItem({ ...editingMenuItem, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-[#11141a] border border-neutral-700 rounded text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMenuItem(null)}
                      className="px-3 py-1 bg-[#232a36] text-xs text-neutral-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Item</span>
                    </button>
                  </div>
                </form>
              )}

              {/* List of current menu items */}
              <div className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-[#13171f] overflow-hidden">
                {menuItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 flex items-center justify-between hover:bg-[#181d26] transition-colors gap-4"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border border-neutral-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate">{item.name}</span>
                          <span className="text-xs font-mono font-bold text-amber-400">{item.price}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 truncate max-w-lg">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => setEditingMenuItem(item)}
                        className="p-1.5 text-neutral-400 hover:text-amber-400 hover:bg-[#202733] rounded transition-colors"
                        title="Edit Dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMenuItem(item.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-[#202733] rounded transition-colors"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VISITING HOURS */}
          {activeTab === 'hours' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Visiting & Dining Hours</h4>
                <p className="text-xs text-neutral-400">
                  Update daily lunch, dinner, and kitchen hours displayed to guests.
                </p>
              </div>

              <div className="space-y-3">
                {visitingHours.map(vh => (
                  <div
                    key={vh.day}
                    className="p-3.5 bg-[#141820] border border-neutral-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="w-28 font-semibold text-sm text-white">{vh.day}</div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block">Lunch Shift</span>
                        <input
                          type="text"
                          value={vh.lunch}
                          onChange={e => updateVisitingHour(vh.day, e.target.value, vh.dinner, vh.status)}
                          className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-neutral-200"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block">Dinner Shift</span>
                        <input
                          type="text"
                          value={vh.dinner}
                          onChange={e => updateVisitingHour(vh.day, vh.lunch, e.target.value, vh.status)}
                          className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-neutral-200"
                        />
                      </div>
                    </div>
                    <div className="w-28">
                      <span className="text-[10px] text-neutral-500 uppercase block">Status</span>
                      <select
                        value={vh.status}
                        onChange={e => updateVisitingHour(vh.day, vh.lunch, vh.dinner, e.target.value as any)}
                        className="w-full px-2 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-neutral-200"
                      >
                        <option value="open">Open</option>
                        <option value="special">Special</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BANQUET HALLS */}
          {activeTab === 'banquet' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Banquet Facilities & Capacities</h4>
                <p className="text-xs text-neutral-400">
                  Adjust guest capacities, pricing, and features for event organizers.
                </p>
              </div>

              <div className="space-y-4">
                {banquetHalls.map(hall => (
                  <div key={hall.id} className="p-4 bg-[#141820] border border-neutral-800 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-amber-400">{hall.name}</h5>
                      <span className="text-xs font-mono text-neutral-300">{hall.dimensions}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Seated Capacity</label>
                        <input
                          type="number"
                          value={hall.capacitySeated}
                          onChange={e =>
                            updateBanquetHall({ ...hall, capacitySeated: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Reception Capacity</label>
                        <input
                          type="number"
                          value={hall.capacityReception}
                          onChange={e =>
                            updateBanquetHall({ ...hall, capacityReception: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Base Pricing / Rate</label>
                        <input
                          type="text"
                          value={hall.basePricing || ''}
                          onChange={e => updateBanquetHall({ ...hall, basePricing: e.target.value })}
                          className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">Tagline & Description</label>
                      <textarea
                        rows={2}
                        value={hall.description}
                        onChange={e => updateBanquetHall({ ...hall, description: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs bg-[#0e1117] border border-neutral-700 rounded text-neutral-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RESERVATIONS LOG */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Live Online Booking Log</h4>
                <p className="text-xs text-neutral-400">
                  Recent table reservations made through the customer booking engine.
                </p>
              </div>

              {reservations.length === 0 ? (
                <div className="p-8 text-center bg-[#141820] border border-neutral-800 rounded-lg text-neutral-400">
                  <CalendarCheck className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm">No reservations logged yet.</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Bookings created on the "Online Booking" page will appear here instantly.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-800 bg-[#13171f] border border-neutral-800 rounded-lg overflow-hidden">
                  {reservations.map(res => (
                    <div key={res.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{res.guestName}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                            #{res.id}
                          </span>
                          <span className="text-xs text-emerald-400 font-medium">Confirmed ✓</span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-x-4">
                          <span>Date: {res.date} at {res.time}</span>
                          <span>Party: {res.guests} Guests</span>
                          <span>Area: {res.seatingArea}</span>
                          <span>Occasion: {res.occasion}</span>
                        </div>
                        {res.specialRequests && (
                          <p className="text-xs text-neutral-500 mt-1 italic">
                            Notes: "{res.specialRequests}"
                          </p>
                        )}
                      </div>

                      <div className="text-xs text-neutral-400 sm:text-right">
                        <div>{res.email}</div>
                        <div className="font-mono text-neutral-300">{res.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-[#232934] bg-[#0c0e12] flex items-center justify-between">
          <button
            onClick={resetToDefaults}
            className="text-xs text-neutral-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Defaults</span>
          </button>

          <button
            onClick={() => {
              showToast('All modifications saved.');
              setIsClientEditorOpen(false);
            }}
            className="px-5 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
