import React from 'react';
import { Sparkles, Crown, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MonetizationBanner = ({ type = 'recipe-top' }) => {
  const { isPremium, setIsChefClubModalOpen } = useAuth();

  if (isPremium) {
    return (
      <div className="my-4 p-3 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 rounded-2xl flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span className="font-semibold">Chef Club VIP Ad-Free Browsing Active</span>
          <span className="hidden md:inline text-amber-700/80">• Third-party commercial ads suppressed for your account.</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-200/60 font-bold text-[10px] text-amber-800">
          Ad-Free Member
        </span>
      </div>
    );
  }

  return (
    <div className="my-6 relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white shadow-lg border border-stone-700/50 p-5 sm:p-6">
      <div className="absolute top-2 right-3 flex items-center gap-1.5 text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
        <span>Sponsored Showcase</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 text-orange-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-lg font-bold text-amber-200">
                Lodge Cast Iron & KitchenAid Spring Culinary Showcase
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                25% Off
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 max-w-xl">
              Elevate your home cooking with professional-grade pre-seasoned skillets and stand mixers featured in Food Network star kitchens.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <span>Shop Featured Cookware</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsChefClubModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Remove Ads ($9.99/mo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
