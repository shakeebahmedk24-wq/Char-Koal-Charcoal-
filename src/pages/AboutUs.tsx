import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  Flame,
  Award,
  ShieldCheck,
  Users,
  Compass,
  HeartHandshake,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setCurrentPage } = useRestaurant();

  const leadership = [
    {
      name: 'Chef Tariq Al-Husseini',
      role: 'Executive Chef & Master Pitmaster',
      bio: 'Trained across Istanbul, Tokyo, and San Sebastián, Chef Tariq brings 22 years of fire-tending mastery. His signature lies in balancing intense Binchotan heat with nuanced Levantine spices and dry-aged charcuterie techniques.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Genevieve Moreau',
      role: 'Director of Banquets & Sommelier',
      bio: 'With a background directing private galas for luxury European hospitality groups, Genevieve oversees our 2,000-bottle wine cellar and orchestrates seamless 450-guest banquet executions.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Kazuki Tanaka',
      role: 'Hearth Architect & Yakitori Specialist',
      bio: 'A third-generation grill master from Wakayama, Japan, Kazuki curates our imported white oak Binchotan charcoal and oversees skewering geometry for optimal thermal penetration.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const pillars = [
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: 'Kishu Binchotan Hardwood',
      desc: 'Sustainably harvested Japanese white oak charcoal that burns virtually smokeless with intense infrared radiant energy, sealing in moisture instantly.'
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      title: 'Precision Dry-Aging Vault',
      desc: 'Our in-house Himalayan salt aging room maintains 34°F and 75% humidity for 45 to 60 days, yielding concentrated umami and tender muscle fibers.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
      title: 'Hearth-to-Banquet Synchronization',
      desc: 'Every wedding banquet or gala receives the same artisanal fire-roasted quality as an individual dining table, powered by our dual satellite banquet kitchens.'
    }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <AnimatedSection className="relative py-20 bg-[#0d0f13] border-b border-[#1f242d] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=80"
            alt="Artisanal fire"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-amber-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Heritage & Craft
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-6">
            The Philosophy of Open Flame
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Char-Koal was born from a singular obsession: to revive the primordial elegance of live charcoal cooking in an architectural setting of modern luxury.
          </p>
        </div>
      </AnimatedSection>

      {/* Origin Story Section */}
      <AnimatedSection className="py-20 bg-[#0a0c0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                alt="Fire roasting"
                className="rounded-xl border border-neutral-800 shadow-2xl w-full object-cover h-[460px]"
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 rounded-xl bg-[#141820] border border-amber-500/40 shadow-2xl max-w-xs">
                <div className="font-serif-luxury text-3xl font-bold text-amber-400">1,000°F</div>
                <div className="text-xs text-neutral-300 mt-1">
                  Peak infrared radiant surface heat produced by Kishu Binchotan oak coals.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold block">
                The Origin
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
                Where Ancient Fire Meets Contemporary Luxury.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Before modern ovens and gas ranges, mankind gathered around natural glowing embers. Fire was not merely a source of thermal energy — it was a spiritual catalyst that brought communities together.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                At Char-Koal, we set out to build a culinary sanctuary where guests could watch the ancient alchemy of wood, iron, and meat unfold in real time. We commissioned custom counter-weighted stainless steel grills with hand-cranked elevation wheels, allowing our pitmasters to calibrate sear distances down to fractions of an inch.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                From our intimate dining room to our four expansive banquet facilities, every guest is enveloped in the warmth of our hearth and the precision of our hospitality.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Explore The Menu
                </button>
                <button
                  onClick={() => setCurrentPage('banquet')}
                  className="px-5 py-2.5 rounded-md bg-[#161a22] hover:bg-[#1d232e] border border-neutral-700 text-xs text-neutral-200 uppercase tracking-wider font-medium transition-colors"
                >
                  Tour Banquet Halls
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pillars of Gastronomy */}
      <AnimatedSection className="py-20 bg-[#0e1117] border-t border-b border-[#1d222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Our Core Principles
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              The Three Pillars of Char-Koal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#131720] border border-[#232936] space-y-4 hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Culinary Masters / Team */}
      <AnimatedSection className="py-20 bg-[#0a0c0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Our Artisans
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              The Masters of the Hearth
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Passionate culinary artists and banquet curators dedicated to your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div
                key={i}
                className="bg-[#12161f] border border-[#212733] rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-serif-luxury text-xl font-bold text-white">{leader.name}</h3>
                    <div className="text-xs text-amber-400 font-medium tracking-wide uppercase">
                      {leader.role}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-2">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
