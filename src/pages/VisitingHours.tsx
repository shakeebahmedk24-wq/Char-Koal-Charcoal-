import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  Clock,
  Car,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  PhoneCall,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const VisitingHours: React.FC = () => {
  const { visitingHours, setCurrentPage } = useRestaurant();

  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[currentDayIndex];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header */}
      <section className="relative py-16 bg-[#0d1015] border-b border-[#1f242d] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Operational Hours & Valet</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            Visiting & Dining Hours
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Join us for lunch, twilight hearth dinner, or weekend artisan brunch.
          </p>

          {/* Live Status Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#151a24] border border-amber-500/40 shadow-lg text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">
              Today is {todayName}: Kitchen Open for Dinner Seating
            </span>
            <span className="text-neutral-500">&bull;</span>
            <span className="text-amber-400 font-mono">Last seating 10:30 PM</span>
          </div>
        </div>
      </section>

      {/* Main Schedule Grid */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#12161f] border border-neutral-700/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-neutral-800 bg-[#161c27] flex items-center justify-between">
            <h2 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
              <span>Weekly Dining Schedule</span>
            </h2>
            <span className="text-xs text-amber-400 font-mono">Reservations Recommended</span>
          </div>

          <div className="divide-y divide-neutral-800">
            {visitingHours.map(vh => {
              const isToday = vh.day.toLowerCase() === todayName.toLowerCase();
              return (
                <div
                  key={vh.day}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isToday ? 'bg-amber-500/10 border-l-4 border-l-amber-500' : 'hover:bg-[#161b24]'
                  }`}
                >
                  <div className="w-36 flex items-center gap-2">
                    <span className="font-serif-luxury text-lg font-bold text-white">{vh.day}</span>
                    {isToday && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold uppercase">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-0.5">
                        Lunch / Brunch
                      </span>
                      <span className="font-mono text-neutral-200">{vh.lunch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-0.5">
                        Dinner & Hearth
                      </span>
                      <span className="font-mono text-amber-300 font-semibold">{vh.dinner}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                      Open Regular Hours
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Policies & Valet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Card 1: Valet & Arrival */}
          <div className="p-6 rounded-xl bg-[#131720] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Complimentary Valet Parking
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Complimentary curbside valet service is provided directly at our porte-cochère on Charcoal Avenue for all dinner and banquet guests starting at 5:00 PM daily. Self-parking is also available in the adjoining covered subterranean structure.
            </p>
          </div>

          {/* Card 2: Kitchen Last Call & Dress Code */}
          <div className="p-6 rounded-xl bg-[#131720] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Kitchen Orders & Dress Code
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              To ensure every cut is charred to perfection, our Binchotan hearth last call is 45 minutes prior to dining room close. We kindly request Smart Casual attire (collared shirts or elegant evening wear; athletic wear and flip-flops are prohibited).
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('booking')}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xl transition-all"
          >
            Reserve Your Seating Time
          </button>
        </div>
      </section>
    </div>
  );
};
