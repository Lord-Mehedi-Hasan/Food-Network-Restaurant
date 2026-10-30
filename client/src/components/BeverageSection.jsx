import React, { useState, useEffect } from 'react';
import { 
  Wine, 
  Coffee, 
  Sparkles, 
  Flame, 
  GlassWater, 
  Package, 
  Ticket, 
  ShoppingBag, 
  Check, 
  ChevronRight, 
  Star, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Award
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const BeverageSection = () => {
  const { addItem } = useCart();
  const { user, token } = useAuth();

  const [activeTab, setActiveTab] = useState('cocktails'); // 'cocktails', 'wine', 'coffee', 'clubs', 'events'
  const [beverages, setBeverages] = useState([]);
  const [subscriptionBoxes, setSubscriptionBoxes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state for cocktails
  const [selectedSpirit, setSelectedSpirit] = useState('All');
  const [selectedBeverageModal, setSelectedBeverageModal] = useState(null);

  // Subscription box join modal
  const [joiningBox, setJoiningBox] = useState(null);
  const [membershipConfirmed, setMembershipConfirmed] = useState(null);

  // Ticket booking modal
  const [bookingEvent, setBookingEvent] = useState(null);
  const [ticketConfirmed, setTicketConfirmed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bevRes, boxRes, evRes] = await Promise.all([
          api.getBeverages(),
          api.getSubscriptionBoxes(),
          api.getEvents(),
        ]);

        if (bevRes.success) setBeverages(bevRes.beverages);
        if (boxRes.success) setSubscriptionBoxes(boxRes.boxes);
        if (evRes.success) setEvents(evRes.events);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cocktails = beverages.filter((b) => b.type === 'Cocktail Recipe');
  const wines = beverages.filter((b) => b.type === 'Wine & Sommelier Guide');
  const coffeeTeas = beverages.filter((b) => b.type === 'Artisan Coffee & Tea');

  const filteredCocktails = selectedSpirit === 'All'
    ? cocktails
    : cocktails.filter((c) => c.spiritOrBase?.toLowerCase().includes(selectedSpirit.toLowerCase()));

  const handleJoinBox = async (box) => {
    try {
      const res = await api.joinSubscriptionBox({
        boxId: box._id,
        frequency: 'Monthly',
        subscriberName: user?.name || 'Beverage Connoisseur',
        subscriberEmail: user?.email || 'member@foodnetwork.com',
      }, token);

      if (res.success) {
        setMembershipConfirmed(res.membership);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookTicket = async (event) => {
    try {
      const res = await api.bookEventTicket({
        eventId: event._id,
        ticketsCount: 1,
        attendeeName: user?.name || 'Culinary Guest',
        attendeeEmail: user?.email || 'guest@foodnetwork.com',
      }, token);

      if (res.success) {
        setTicketConfirmed(res.ticket);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Wine className="w-4 h-4" />
            <span>Beverages & Drinks Hub</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900">
            Mixology, Sommelier Cellar & Artisan Coffee
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Explore craft cocktail recipes, sommelier tasting notes, direct-to-consumer specialty bottles, monthly tasting subscriptions, and ticketed culinary events.
          </p>
        </div>

        {/* Sub-Pillar Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200/80 overflow-x-auto max-w-full">
          {[
            { id: 'cocktails', label: 'Craft Cocktails', icon: GlassWater },
            { id: 'wine', label: 'Wine & Sommelier', icon: Wine },
            { id: 'coffee', label: 'Artisan Coffee & Tea', icon: Coffee },
            { id: 'clubs', label: 'Subscription Clubs', icon: Package },
            { id: 'events', label: 'Tasting Events', icon: Ticket },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-600' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: CRAFT COCKTAILS */}
      {activeTab === 'cocktails' && (
        <div className="space-y-6">
          
          {/* Spirit base filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-stone-500 flex-shrink-0">Spirit Base:</span>
            {['All', 'Bourbon', 'Gin', 'Tequila', 'Vodka'].map((spirit) => (
              <button
                key={spirit}
                onClick={() => setSelectedSpirit(spirit)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSpirit === spirit
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {spirit}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCocktails.map((cocktail) => (
              <div
                key={cocktail._id}
                className="group rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                    <img
                      src={cocktail.image}
                      alt={cocktail.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-700 text-white shadow">
                        {cocktail.spiritOrBase}
                      </span>
                      {cocktail.abv > 0 && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                          {cocktail.abv}% ABV
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-amber-400 text-xs mb-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{cocktail.rating}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold leading-tight">
                        {cocktail.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {cocktail.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {cocktail.flavorProfile?.map((flavor) => (
                        <span key={flavor} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-800">
                          {flavor}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Glass: {cocktail.glassware}</span>
                      <span>Level: {cocktail.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedBeverageModal(cocktail)}
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>View Recipe & Mixology Steps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WINE & SOMMELIER CELLAR */}
      {activeTab === 'wine' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-rose-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                Direct-to-Consumer (D2C) Cellar
              </span>
              <h3 className="font-serif text-xl font-bold">
                Sommelier-Curated Estate Bottles Shipped to Your Door
              </h3>
              <p className="text-xs text-rose-200 mt-1">
                Temperature-controlled cellar shipping. Free shipping for Chef Club VIP members.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wines.map((wine) => (
              <div
                key={wine._id}
                className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex gap-5">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-28 h-40 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {wine.regionOrOrigin}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{wine.rating}</span>
                      </div>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                      {wine.name}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-2">
                      {wine.description}
                    </p>

                    {/* Sommelier Tasting Matrix */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <div>
                        <span className="text-stone-400 block">Body:</span>
                        <span className="font-bold text-stone-800">{wine.tastingNotes?.body}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Acidity:</span>
                        <span className="font-bold text-stone-800">{wine.tastingNotes?.acidity}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-rose-900 font-semibold">
                      Pairing: {wine.pairingSuggestions?.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">{wine.bottleOrBagSize}</span>
                    <span className="font-black text-xl text-stone-900">${wine.price?.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBeverageModal(wine)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200"
                    >
                      Tasting Notes
                    </button>
                    <button
                      onClick={() => addItem(wine, 'Food Network Sommelier Cellar')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Bottle</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ARTISAN COFFEE & TEA */}
      {activeTab === 'coffee' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coffeeTeas.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-36 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {item.regionOrOrigin}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="text-[11px] font-semibold text-stone-600 bg-stone-50 p-2 rounded-lg">
                      Aroma: {item.tastingNotes?.aroma}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">{item.bottleOrBagSize}</span>
                    <span className="font-black text-xl text-stone-900">${item.price?.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBeverageModal(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200"
                    >
                      Brew Guide
                    </button>
                    <button
                      onClick={() => addItem(item, 'Food Network Artisan Roasters')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-800 hover:bg-amber-900 text-white flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Bag / Tin</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SUBSCRIPTION BOXES (MONETIZATION) */}
      {activeTab === 'clubs' && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Curated Monthly Deliveries
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
              Join Our Culinary & Beverage Clubs
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Recurring monthly crates curated by Master Sommeliers and Champion Baristas. Skip, pause, or cancel anytime with 1 click.
            </p>
          </div>

          {membershipConfirmed && (
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center max-w-lg mx-auto space-y-2 animate-in fade-in">
              <span className="w-10 h-10 rounded-full bg-emerald-500 text-white inline-flex items-center justify-center font-bold">
                ✓
              </span>
              <h4 className="font-serif text-lg font-bold text-emerald-950">
                Welcome to {membershipConfirmed.boxTitle}!
              </h4>
              <p className="text-xs text-emerald-800">
                Membership Code: <span className="font-mono font-bold">{membershipConfirmed.membershipId}</span>
              </p>
              <p className="text-[11px] text-stone-500">
                Your first tasting box is being assembled and scheduled for dispatch.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionBoxes.map((box) => (
              <div
                key={box._id}
                className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                    <img
                      src={box.image}
                      alt={box.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"></div>
                    {box.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 shadow">
                        {box.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-orange-400 block">
                        {box.type}
                      </span>
                      <h4 className="font-serif text-lg font-bold leading-tight">
                        {box.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-2xl text-stone-900">${box.pricePerMonth}</span>
                      <span className="text-xs text-stone-500 font-semibold">/ month</span>
                    </div>

                    <p className="text-xs text-stone-600">
                      {box.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Club Member Perks:
                      </p>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {box.perks?.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleJoinBox(box)}
                    className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-md shadow-orange-600/20"
                  >
                    Subscribe & Join Club (${box.pricePerMonth}/mo)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CULINARY & BEVERAGE EVENTS (MONETIZATION) */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Ticketed Masterclasses & Galas
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1">
                Experience Culinary & Beverage Events in Person
              </h3>
              <p className="text-xs text-stone-400 max-w-xl mt-1">
                Intimate tastings, hands-on mixology bar stations, and barista immersions led by international award-winning talent.
              </p>
            </div>
          </div>

          {ticketConfirmed && (
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center max-w-lg mx-auto space-y-2 animate-in fade-in">
              <span className="w-10 h-10 rounded-full bg-emerald-500 text-white inline-flex items-center justify-center font-bold">
                ✓
              </span>
              <h4 className="font-serif text-lg font-bold text-emerald-950">
                Ticket Confirmed: {ticketConfirmed.eventTitle}
              </h4>
              <p className="text-xs text-emerald-800">
                Pass Code: <span className="font-mono font-bold">{ticketConfirmed.ticketCode}</span>
              </p>
              <p className="text-[11px] text-stone-500">
                {ticketConfirmed.date} at {ticketConfirmed.time} • {ticketConfirmed.location}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev._id}
                className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"></div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-stone-900 shadow">
                      {ev.category}
                    </span>
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="font-black text-xl text-amber-400">${ev.ticketPrice}</span>
                      <span className="text-[10px] text-stone-300"> / attendee</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                      {ev.title}
                    </h4>

                    <div className="space-y-1 text-xs text-stone-500">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        <span>{ev.date}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span className="line-clamp-1">{ev.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-3">
                      {ev.description}
                    </p>

                    <div className="p-2 rounded-xl bg-orange-50 text-orange-800 text-[11px] font-semibold flex items-center justify-between">
                      <span>Seats Left: {ev.availableSeats}</span>
                      <span>Total: {ev.totalSeats}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleBookTicket(ev)}
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book Ticket (${ev.ticketPrice})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SINGLE BEVERAGE DETAIL MODAL */}
      {selectedBeverageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedBeverageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4">
              <img
                src={selectedBeverageModal.image}
                alt={selectedBeverageModal.name}
                className="w-24 h-24 rounded-2xl object-cover bg-stone-100"
              />
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  {selectedBeverageModal.type}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {selectedBeverageModal.name}
                </h3>
                <p className="text-xs text-stone-500">{selectedBeverageModal.tagline}</p>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              {selectedBeverageModal.description}
            </p>

            {/* Ingredients for Cocktails */}
            {selectedBeverageModal.ingredients && (
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-stone-900">Ingredients & Specs</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedBeverageModal.ingredients.map((ing, i) => (
                    <li key={i} className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex justify-between">
                      <span className="font-semibold text-stone-800">{ing.item}</span>
                      <span className="text-rose-700 font-bold">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {selectedBeverageModal.steps && (
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-stone-900">Mixology Steps</h4>
                <div className="space-y-2">
                  {selectedBeverageModal.steps.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-stone-50 text-xs flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-rose-700 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {st.stepNumber}
                      </span>
                      <p className="text-stone-700">{st.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pro-Tip */}
            {selectedBeverageModal.proTip && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900">
                <span className="font-bold">Bar Champion Pro-Tip: </span>
                {selectedBeverageModal.proTip}
              </div>
            )}

            {/* Tasting Notes */}
            {selectedBeverageModal.tastingNotes && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1.5 text-xs">
                <span className="font-bold text-stone-900 block">Sensory Tasting Profile:</span>
                <p><span className="text-stone-400">Aroma:</span> {selectedBeverageModal.tastingNotes.aroma}</p>
                <p><span className="text-stone-400">Body:</span> {selectedBeverageModal.tastingNotes.body}</p>
                {selectedBeverageModal.tastingNotes.finish && (
                  <p><span className="text-stone-400">Finish:</span> {selectedBeverageModal.tastingNotes.finish}</p>
                )}
              </div>
            )}

            {selectedBeverageModal.isEcommerceProduct && (
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <span className="font-black text-2xl text-stone-900">
                  ${selectedBeverageModal.price?.toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    addItem(selectedBeverageModal, 'Food Network Cellar');
                    setSelectedBeverageModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
