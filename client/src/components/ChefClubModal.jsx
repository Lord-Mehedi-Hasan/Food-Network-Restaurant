import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard,
  Video,
  Wine,
  ChefHat
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ChefClubModal = () => {
  const { isChefClubModalOpen, setIsChefClubModalOpen, upgradeToChefClub, isPremium, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' ($9.99) or 'annual' ($79.99)
  const [successToast, setSuccessToast] = useState('');

  if (!isChefClubModalOpen) return null;

  const handleUpgrade = async () => {
    setSubmitting(true);
    const res = await upgradeToChefClub('chef_club');
    setSubmitting(false);
    if (res.success) {
      setSuccessToast('🎉 You are now an active Food Network Chef Club VIP member!');
      setTimeout(() => {
        setSuccessToast('');
        setIsChefClubModalOpen(false);
      }, 2000);
    }
  };

  const perks = [
    { title: '100% Ad-Free Cooking Experience', desc: 'Commercial display ads are completely removed from all recipe cards and articles.' },
    { title: 'Exclusive Master Chef Vault', desc: 'Unlock Michelin-starred and TV chef signature creations (Valrhona Molten Lava Cake, etc.).' },
    { title: '4K HD Step-by-Step Video Masterclasses', desc: 'Watch techniques up-close with multi-angle chef camera views.' },
    { title: '15% Off All Sommelier Cellar Wines & Coffee', desc: 'Automatic member discount applied to all direct-to-consumer bottle orders.' },
    { title: 'Unlimited PDF Meal Plan & Shopping List Sync', desc: 'Sync seamlessly across all your devices with cloud backup.' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 p-6 sm:p-8 space-y-6">
        
        {/* Floating Close Button */}
        <button
          onClick={() => setIsChefClubModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
            <Crown className="w-8 h-8 fill-stone-950" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Premium Subscription
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
            Join the Food Network Chef Club
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            The ultimate membership for passionate home cooks, fine diners, and beverage enthusiasts.
          </p>
        </div>

        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white text-xs font-bold text-center animate-in fade-in">
            {successToast}
          </div>
        )}

        {/* Pricing Plan Selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedPlan === 'monthly'
                ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/30'
                : 'border-stone-200 bg-stone-50 hover:bg-white'
            }`}
          >
            <span className="text-xs font-bold text-stone-900 block">Monthly Membership</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-2xl text-stone-900">$9.99</span>
              <span className="text-[10px] text-stone-500 font-semibold">/ month</span>
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block">Cancel anytime</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlan('annual')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              selectedPlan === 'annual'
                ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/30'
                : 'border-stone-200 bg-stone-50 hover:bg-white'
            }`}
          >
            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-stone-950 uppercase shadow">
              Save 33%
            </span>
            <span className="text-xs font-bold text-stone-900 block">Annual VIP Pass</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-2xl text-stone-900">$79.99</span>
              <span className="text-[10px] text-stone-500 font-semibold">/ year</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 block">2 months free</span>
          </button>
        </div>

        {/* Perks list */}
        <div className="space-y-2.5 pt-2">
          {perks.map((p, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <div>
                <strong className="text-stone-900 font-bold">{p.title}: </strong>
                <span className="text-stone-600">{p.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Action */}
        <div className="pt-2">
          {isPremium ? (
            <div className="p-4 rounded-2xl bg-amber-100 text-amber-900 text-center font-bold text-xs">
              ⭐ Your Chef Club VIP Membership is Active!
            </div>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>{submitting ? 'Activating VIP Membership...' : `Activate Chef Club (${selectedPlan === 'monthly' ? '$9.99/mo' : '$79.99/yr'})`}</span>
            </button>
          )}

          <p className="text-[10px] text-stone-400 text-center mt-3">
            Secure checkout. 30-day money-back guarantee. No lock-in contracts.
          </p>
        </div>

      </div>
    </div>
  );
};
