import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Bike, 
  ChefHat, 
  MapPin, 
  Receipt, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const OrderTrackingModal = () => {
  const { activeOrder, setActiveOrder, isTrackingModalOpen, setIsTrackingModalOpen } = useCart();
  const [currentOrder, setCurrentOrder] = useState(activeOrder);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setCurrentOrder(activeOrder);
  }, [activeOrder]);

  if (!isTrackingModalOpen || !currentOrder) return null;

  const steps = [
    { key: 'received', label: 'Order Received', icon: Receipt, desc: 'Kitchen confirmed ticket' },
    { key: 'preparing', label: 'Kitchen Preparing', icon: ChefHat, desc: 'Chef cooking your feast' },
    { key: 'on_the_way', label: currentOrder.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup', icon: Bike, desc: 'Courier on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Feast completed • Bon Appétit' },
  ];

  const getStepIndex = (status) => {
    const map = {
      received: 0,
      preparing: 1,
      on_the_way: 2,
      ready_for_pickup: 2,
      delivered: 3,
    };
    return map[status] ?? 0;
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  // Simulation tool to allow instant advancement
  const handleAdvanceStatus = async () => {
    const nextStates = ['preparing', 'on_the_way', 'delivered'];
    const nextStatus = nextStates[currentStepIdx] || 'delivered';

    setUpdating(true);
    try {
      const res = await api.updateOrderStatus(currentOrder._id, nextStatus);
      if (res.success) {
        setCurrentOrder(res.order);
        setActiveOrder(res.order);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 p-6 sm:p-8 space-y-6">
        
        {/* Floating Close Button */}
        <button
          onClick={() => setIsTrackingModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Live Order Tracker
            </span>
            <span className="text-xs font-mono font-bold text-stone-400">
              #{currentOrder.orderNumber}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-black text-stone-900 mt-1">
            Tracking Your Culinary Delivery
          </h3>
          <p className="text-xs text-stone-500">
            From {currentOrder.restaurantName || 'Food Network Partner'}
          </p>
        </div>

        {/* Animated Visual Progress Stepper */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-6">
          <div className="relative flex items-center justify-between">
            {/* Progress line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-200 -z-0">
              <div
                className="h-full bg-orange-600 transition-all duration-500"
                style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isPastOrCurrent = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={st.key} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 scale-110 ring-4 ring-orange-200'
                        : isPastOrCurrent
                        ? 'bg-stone-900 text-white'
                        : 'bg-white text-stone-300 border-2 border-stone-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold mt-2 text-center ${
                    isCurrent ? 'text-orange-600' : isPastOrCurrent ? 'text-stone-800' : 'text-stone-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Estimated Arrival: <strong className="text-stone-900">{currentOrder.estimatedDeliveryTime || '25-35 mins'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span className="truncate max-w-[180px]">{currentOrder.deliveryAddress?.street || 'Pickup at Counter'}</span>
            </div>
          </div>
        </div>

        {/* Live Simulator Button for User to test backend status advancement */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold">Simulator Controls:</p>
            <p className="text-[11px] text-amber-700">Click to advance to the next delivery stage on the backend.</p>
          </div>
          <button
            onClick={handleAdvanceStatus}
            disabled={updating || currentOrder.status === 'delivered'}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm disabled:opacity-50"
          >
            {currentOrder.status === 'delivered' ? 'Delivery Complete' : 'Advance Next Stage →'}
          </button>
        </div>

        {/* Order Items Summary */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif text-sm font-bold text-stone-900">Ordered Items ({currentOrder.items?.length})</h4>
          <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto">
            {currentOrder.items?.map((item, i) => (
              <div key={i} className="py-2 flex items-center justify-between text-xs">
                <span className="text-stone-800">
                  <strong className="text-orange-600">{item.quantity}x</strong> {item.name}
                </span>
                <span className="font-bold text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
            <span className="text-xs text-stone-500">Total Paid (incl. tax & fees)</span>
            <span className="font-black text-xl text-stone-900">${currentOrder.total?.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
