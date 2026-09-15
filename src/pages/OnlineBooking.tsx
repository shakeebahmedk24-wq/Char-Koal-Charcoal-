import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Reservation } from '../types/restaurant';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  CalendarCheck,
  Flame,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Calendar as CalendarIcon,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Share2,
  Download
} from 'lucide-react';

export const OnlineBooking: React.FC = () => {
  const { addReservation, setCurrentPage, showToast } = useRestaurant();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState('Hearth Counter / Pitmaster Bar');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const seatingOptions = [
    {
      id: 'hearth',
      name: 'Hearth Counter / Pitmaster Bar',
      desc: 'Front-row counter seating witnessing coals, skewers, and fire-tending.'
    },
    {
      id: 'main',
      name: 'Main Charcoal Dining Hall',
      desc: 'Warm walnut booths, bronze chandeliers, and lively dining atmosphere.'
    },
    {
      id: 'booth',
      name: 'Private Romantic Booth',
      desc: 'Secluded high-back velvet banquette with intimate spotlighting.'
    },
    {
      id: 'terrace',
      name: 'Starlit Charcoal Terrace',
      desc: 'Open-air al fresco dining with radiant overhead heat and fire pits.'
    }
  ];

  const occasions = [
    'Casual Dining',
    'Romantic Date Night',
    'Birthday Celebration',
    'Anniversary Gala',
    'Corporate Dinner',
    'Family Gathering'
  ];

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email || !phone) return;

    const res = addReservation({
      guestName,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      occasion,
      specialRequests,
      status: 'confirmed'
    });

    setConfirmedReservation(res);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header */}
      <AnimatedSection as="section" direction="fade" duration={800} className="relative py-16 bg-[#0d1015] border-b border-[#1f242d] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Instant Table Confirmation</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            Reserve Your Seating
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table over glowing Binchotan coals. No waiting, immediate confirmation voucher generated.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="section" direction="up" delay={80} className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {confirmedReservation ? (
          /* Confirmation Boarding Pass Voucher */
          <div className="bg-[#12161f] border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest block opacity-90">
                  Reservation Confirmed ✓
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                  Char-Koal Dining Pass
                </h2>
              </div>
              <div className="sm:text-right">
                <span className="text-xs uppercase font-mono block opacity-80">Reference Code</span>
                <span className="text-2xl font-mono font-bold">#{confirmedReservation.id}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Guest Name</span>
                  <span className="text-sm font-bold text-white">{confirmedReservation.guestName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Party Size</span>
                  <span className="text-sm font-bold text-amber-400">{confirmedReservation.guests} Guests</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Date</span>
                  <span className="text-sm font-bold text-white">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Time</span>
                  <span className="text-sm font-bold text-amber-400">{confirmedReservation.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Seating Area</span>
                  <span className="text-sm font-semibold text-white">{confirmedReservation.seatingArea}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5 uppercase tracking-wider">Occasion Tag</span>
                  <span className="text-sm font-semibold text-white">{confirmedReservation.occasion}</span>
                </div>
              </div>

              {confirmedReservation.specialRequests && (
                <div className="p-3 rounded-lg bg-[#181d26] border border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-semibold block mb-0.5">Special Requests:</span>
                  <p className="text-neutral-200 italic">"{confirmedReservation.specialRequests}"</p>
                </div>
              )}

              {/* QR Code & Arrival advisory */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-[#0f1218] border border-neutral-800">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white p-2 rounded-lg flex items-center justify-center text-neutral-950">
                    <QrCode className="w-12 h-12" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Digital Check-In Ready</span>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      Present this screen or reference #{confirmedReservation.id} to our maitre d' at arrival.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast('Voucher details copied / added to calendar.');
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add to Calendar</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="text-xs text-amber-400 hover:underline"
                >
                  &larr; Make Another Reservation
                </button>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
                >
                  Pre-Select Menu Dishes
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Reservation Input Form */
          <div className="bg-[#12161f] border border-neutral-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Step 1: Party, Date, Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                    Party Size *
                  </label>
                  <select
                    value={guests}
                    onChange={e => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20].map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                    Time Slot *
                  </label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Seating Area Choice */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                  Seating Experience Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map(opt => (
                    <label
                      key={opt.id}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        seatingArea === opt.name
                          ? 'bg-[#1a212d] border-amber-500 ring-2 ring-amber-500/20'
                          : 'bg-[#0f1218] border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="seatingArea"
                        checked={seatingArea === opt.name}
                        onChange={() => setSeatingArea(opt.name)}
                        className="accent-amber-500 mt-1"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{opt.name}</span>
                        <span className="text-[11px] text-neutral-400 leading-relaxed block mt-0.5">
                          {opt.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Occasion */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                  Dining Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map(occ => (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        occasion === occ
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-[#151a23] text-neutral-300 border border-neutral-700 hover:bg-[#1d2330]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="pt-4 border-t border-neutral-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Guest Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(555) 242-7562"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Special Dietary Notes or Seating Requests
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Allergies (nuts, shellfish, gluten), anniversary dessert candle, quiet table preference..."
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Confirm Table Reservation (Instant Voucher)</span>
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2">
                  No cancellation fees up to 2 hours before dining time. Complimentary valet at entrance.
                </p>
              </div>
            </form>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
};
