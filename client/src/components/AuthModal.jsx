import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Crown,
  ChefHat
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    let res;
    if (isRegisterMode) {
      res = await register(name, email, password);
    } else {
      res = await login(email, password);
    }

    setSubmitting(false);
    if (!res.success) {
      setError(res.message || 'Authentication error');
    }
  };

  const handleQuickDemoLogin = async (demoEmail) => {
    setError('');
    setSubmitting(true);
    const res = await login(demoEmail, 'password123');
    setSubmitting(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 p-6 sm:p-8 space-y-6">
        
        {/* Floating Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
            {isRegisterMode ? 'Create Food Network Account' : 'Welcome to Food Network'}
          </h3>
          <p className="text-xs text-stone-500">
            {isRegisterMode
              ? 'Join our community of home cooks and culinary diners'
              : 'Sign in to access your meal plan, saved recipes and orders'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegisterMode && (
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Julia Child"
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@foodnetwork.com"
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>{submitting ? 'Please wait...' : isRegisterMode ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500">
          {isRegisterMode ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="text-orange-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="text-orange-600 font-bold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

        {/* 1-Click Demo Profiles */}
        <div className="pt-4 border-t border-stone-100 space-y-2">
          <p className="text-[10px] uppercase font-bold text-stone-400 text-center tracking-wider">
            1-Click Quick Demo Login
          </p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('foodie@foodnetwork.com')}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="font-bold text-stone-900 block">Sarah Jenkins (Foodie)</span>
                  <span className="text-[10px] text-stone-500">Chef Club VIP Member • Active Meal Plan</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-orange-600">Login →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('chef@foodnetwork.com')}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-300 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-orange-600" />
                <div>
                  <span className="font-bold text-stone-900 block">Chef Marco Bellini</span>
                  <span className="text-[10px] text-stone-500">Master Chef & Restaurant Partner</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-orange-600">Login →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin@foodnetwork.com')}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <div>
                  <span className="font-bold text-stone-900 block">Alex Rivera (Platform Admin)</span>
                  <span className="text-[10px] text-stone-500">Director of Culinary Operations</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-orange-600">Login →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
