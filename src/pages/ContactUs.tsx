import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Send,
  CheckCircle2,
  Navigation,
  Compass
} from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { showToast, setCurrentPage } = useRestaurant();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message transmitted to the Char-Koal concierge team.');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0a0c0f]">
      {/* Header */}
      <section className="relative py-16 bg-[#0d1015] border-b border-[#1f242d] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Us & Connect</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mb-4">
            Contact & Location
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Located in the heart of the Culinary District. Reach our concierge, banquet coordinators, or valet team.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-xl bg-[#12161f] border border-neutral-800 space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Direct Inquiries & Hotlines
              </h3>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Street Address</span>
                    <p className="text-neutral-400 mt-0.5">
                      742 Charcoal Avenue, Hearth Square<br />
                      Culinary District, CA 94103
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Table Reservations Line</span>
                    <a
                      href="tel:+15552427562"
                      className="text-amber-400 hover:underline font-mono text-sm font-semibold"
                    >
                      (555) 242-7562
                    </a>
                    <span className="text-[10px] text-neutral-500 block">Mon – Sun: 10:00 AM – 11:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Banquet & Catering Office</span>
                    <a
                      href="tel:+15552427563"
                      className="text-amber-400 hover:underline font-mono text-sm font-semibold"
                    >
                      (555) 242-7563
                    </a>
                    <span className="text-[10px] text-neutral-500 block">Dedicated Event Directors</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Concierge Email</span>
                    <a
                      href="mailto:concierge@char-koal.com"
                      className="text-amber-400 hover:underline"
                    >
                      concierge@char-koal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Valet & Transit</span>
                    <p className="text-neutral-400 mt-0.5">
                      Complimentary valet drop-off at main entrance starting at 5:00 PM. Metro Hearth Square station is 2 blocks west.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('booking')}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-md"
                >
                  Book Online Table Instead
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#12161f] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Send a Message
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                We Await Your Visit
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                For private tasting requests, media inquiries, or custom dietary arrangements.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-serif-luxury">Message Dispatched</h4>
                <p className="text-xs text-neutral-300">
                  Thank you, {name}. Our guest relations team has received your communication and will reply promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-neutral-800 text-xs text-white rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
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
                      placeholder="marcus@example.com"
                      className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Private Dining">Private Dining Room Booking</option>
                    <option value="Banquet Gala">Banquet Facility / Wedding Gala</option>
                    <option value="Press / Media">Press, Photography & Media</option>
                    <option value="Careers">Culinary & Pitmaster Careers</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How may our concierge assist your culinary experience?"
                    className="w-full px-3 py-2 text-xs bg-[#0e1117] border border-neutral-700 rounded-md text-white focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Embedded Location Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-[#12161f] shadow-2xl">
          <div className="p-4 bg-[#161c26] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span className="font-serif-luxury text-base font-bold">
                Interactive Hearth District Location Map
              </span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <Navigation className="w-3 h-3" />
            </a>
          </div>

          <div className="relative h-96 w-full bg-[#0d1016]">
            {/* OpenStreetMap iframe styled dark */}
            <iframe
              title="Char-Koal Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4200%2C37.7700%2C-122.4000%2C37.7850&amp;layer=mapnik&amp;marker=37.7780%2C-122.4100"
              className="w-full h-full filter invert hue-rotate-180 contrast-125 opacity-70"
            />
            <div className="absolute top-4 left-4 p-4 rounded-xl bg-[#0f131a]/95 border border-amber-500/40 shadow-2xl max-w-xs text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold mb-1">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="font-serif-luxury text-sm text-white">Char-Koal Restaurant</span>
              </div>
              <p className="text-neutral-300">
                742 Charcoal Avenue &bull; Culinary Arts Plaza
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                Valet Attendants Active at Porte-Cochère
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
