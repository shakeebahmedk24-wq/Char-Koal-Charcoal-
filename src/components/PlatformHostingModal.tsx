import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  X,
  Server,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  Cpu,
  Layers,
  FileSpreadsheet,
  Download,
  DollarSign
} from 'lucide-react';

export const PlatformHostingModal: React.FC = () => {
  const { isHostingModalOpen, setIsHostingModalOpen } = useRestaurant();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  if (!isHostingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        id="platform-hosting-panel"
        className="bg-[#11141a] border border-[#262c37] rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#232934] flex items-center justify-between bg-[#151922]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Platform Architecture & Hosting Cost Estimate
              </h3>
              <p className="text-xs text-neutral-400">
                Detailed cost analysis for WordPress and Managed Cloud deployment.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsHostingModalOpen(false)}
            className="p-2 rounded-lg bg-[#1e2430] hover:bg-[#272f3f] text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Executive Summary */}
          <div className="p-4 rounded-lg bg-[#161b24] border border-neutral-700/80">
            <h4 className="text-sm font-bold text-amber-400 mb-1">
              Architecture & CMS Strategy
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Per requirements <strong>#2 (Platform)</strong> and <strong>#3 (Hosting)</strong>, the restaurant site is architected for effortless post-launch client editing (menu prices, weekly hours, banquet room capacities, photos) while delivering sub-second load times on mobile devices.
            </p>
          </div>

          {/* Billing Cycle Switch */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div>
              <h4 className="text-sm font-semibold text-white">Estimated Operating Breakdown</h4>
              <p className="text-xs text-neutral-400">Fixed costs for high-reliability restaurant operations.</p>
            </div>
            <div className="flex items-center bg-[#171c24] p-1 rounded-md border border-neutral-700 text-xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                  billingCycle === 'monthly' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                  billingCycle === 'annual' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Annual (Save 15%)
              </button>
            </div>
          </div>

          {/* Itemized Line Items */}
          <div className="space-y-3">
            {/* Item 1: Managed Hosting */}
            <div className="p-4 rounded-lg bg-[#141820] border border-neutral-800 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    Premium Managed Restaurant Hosting (WP Engine / Kinsta / Cloudways)
                  </h5>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Dedicated PHP 8.3/Node stack, Edge caching, 99.99% SLA, peak reservation traffic handling, automated daily off-site backups, and staging sandbox.
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-emerald-400 font-medium">
                    <span>✓ Free SSL Certificate</span>
                    <span>✓ DDoS Protection</span>
                    <span>✓ Global CDN Included</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-base font-bold font-mono text-white">
                  {billingCycle === 'annual' ? '$420 / yr' : '$39 / mo'}
                </div>
                <span className="text-[10px] text-neutral-500">Tier 1 Host</span>
              </div>
            </div>

            {/* Item 2: Custom Domain */}
            <div className="p-4 rounded-lg bg-[#141820] border border-neutral-800 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Custom Domain & DNS Privacy</h5>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Premium <code>.com</code> registration, WHOIS identity privacy protection, high-speed Cloudflare DNS routing.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-base font-bold font-mono text-white">
                  {billingCycle === 'annual' ? '$18 / yr' : '$1.50 / mo'}
                </div>
                <span className="text-[10px] text-neutral-500">Registrar</span>
              </div>
            </div>

            {/* Item 3: CMS & Self-Editing Engine */}
            <div className="p-4 rounded-lg bg-[#141820] border border-neutral-800 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    Client Self-Editing Dashboard & Reservation Engine
                  </h5>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Zero-code live editor for menu prices, dishes, visiting hours, banquet capacity rules, and printable Menu Kit generator.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-base font-bold font-mono text-emerald-400">
                  Included
                </div>
                <span className="text-[10px] text-neutral-500">Built-in</span>
              </div>
            </div>
          </div>

          {/* Total Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-neutral-900 border border-amber-500/40 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Total Estimated Annual Operating Cost
              </span>
              <p className="text-xs text-neutral-300">
                Includes all hosting, domain, SSL, automated backups, and 24/7 security.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-white">
                {billingCycle === 'annual' ? '$438 / year' : '$40.50 / month'}
              </div>
              <span className="text-[11px] text-amber-300">≈ $1.20 / day</span>
            </div>
          </div>

          {/* Benchmark comparison */}
          <div className="p-4 rounded-lg bg-[#14171e] border border-neutral-800 space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Comparison vs. Benchmark (char-koal.com)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Off-canvas mobile menu navigation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant interactive reservation engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Downloadable & printable PDF Menu Kit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Interactive Banquet Room RFP calculator</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Direct client self-editor for menu & hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Tap-to-call mobile hotlines & valet notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#232934] bg-[#0c0e12] flex justify-end">
          <button
            onClick={() => setIsHostingModalOpen(false)}
            className="px-5 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Estimate
          </button>
        </div>
      </div>
    </div>
  );
};
