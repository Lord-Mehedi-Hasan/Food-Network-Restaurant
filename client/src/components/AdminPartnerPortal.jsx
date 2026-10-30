import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  Crown, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminPartnerPortal = () => {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [metRes, ordRes, resRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getMyOrders(token),
        api.getMyReservations(token),
      ]);

      if (metRes.success) setMetrics(metRes.metrics);
      if (ordRes.success) setOrders(ordRes.orders);
      if (resRes.success) setReservations(resRes.reservations);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? res.order : o))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Platform Overview & Monetization Hub</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900">
            Partner & Administrative Portal
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Real-time tracking of platform GMV, 12% dining commissions, Chef Club recurring subscriptions, and restaurant order fulfillment.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* GMV */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Gross Merchandise Value</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-black text-stone-900">
            ${metrics?.totalGMV ? metrics.totalGMV.toLocaleString() : '6,420.50'}
          </p>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
            +18.4% this month
          </span>
        </div>

        {/* Platform Commissions */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Platform Commissions (12%)</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-black text-orange-600">
            ${metrics?.totalCommissions ? metrics.totalCommissions.toLocaleString() : '770.46'}
          </p>
          <span className="text-[11px] text-stone-400 block">
            Direct marketplace monetization
          </span>
        </div>

        {/* Chef Club MRR */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Chef Club VIP MRR</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <p className="font-serif text-3xl font-black text-stone-900">
            ${metrics?.monthlySubscriptionMRR ? metrics.monthlySubscriptionMRR.toFixed(2) : '379.62'}
          </p>
          <span className="text-[11px] text-stone-500 block">
            {metrics?.premiumSubscribers || 38} active ad-free subscribers
          </span>
        </div>

        {/* Reserved Tables */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Table Reservations</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-black text-stone-900">
            {metrics?.totalReservations || 94}
          </p>
          <span className="text-[11px] text-stone-400 block">
            Diners seated across partner venues
          </span>
        </div>

      </div>

      {/* Monetization Channels Breakdown */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl space-y-5">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            Multi-Stream Revenue Engine
          </span>
          <h3 className="font-serif text-xl font-bold mt-1">
            Active Food Network Platform Monetization Channels
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics?.monetizationChannels?.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-200">{ch.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-base font-black text-amber-300">{ch.revenue}</p>
              <span className="text-[10px] text-stone-400 block">Status: Fully Operational</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Order Fulfillment Simulation Panel */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Live Order Management & Kitchen Pipeline
            </h3>
            <p className="text-xs text-stone-500">
              Update order status in real time to simulate kitchen and courier dispatch.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
            {orders.length} Active Orders
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {orders.map((ord) => (
            <div key={ord._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-900">#{ord.orderNumber}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    {ord.orderType}
                  </span>
                  <span className="text-xs text-stone-500">• {ord.customer?.name}</span>
                </div>
                <p className="text-xs text-stone-600">
                  {ord.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </p>
                <p className="text-[11px] text-stone-400">
                  Total: <strong className="text-stone-900">${ord.total?.toFixed(2)}</strong> (Platform 12% Commission: ${ord.commissionAmount?.toFixed(2) || '0.00'})
                </p>
              </div>

              {/* Status Updater Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-stone-500">Status:</span>
                <select
                  value={ord.status}
                  disabled={updatingOrderId === ord._id}
                  onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                  className="text-xs font-bold p-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-stone-800"
                >
                  <option value="received">Order Received</option>
                  <option value="preparing">Kitchen Preparing</option>
                  <option value="on_the_way">Out for Delivery</option>
                  <option value="ready_for_pickup">Ready for Pickup</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
