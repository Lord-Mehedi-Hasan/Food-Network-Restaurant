import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Calendar, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Flame,
  Award,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const RestaurantModal = ({ restaurant, onClose }) => {
  const { addItem, setIsCartOpen } = useCart();
  const { user, token } = useAuth();

  const [activeTab, setActiveTab] = useState('menu'); // 'menu', 'reserve', 'reviews', 'gallery'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Reservation form state
  const [partySize, setPartySize] = useState(2);
  const [reserveDate, setReserveDate] = useState('2026-10-24');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(restaurant.reservationSettings?.timeSlots?.[0]?.time || '7:00 PM');
  const [seatingArea, setSeatingArea] = useState('Main Dining Room');
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState('(555) 234-8901');
  const [specialRequests, setSpecialRequests] = useState('');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [reservationSuccess, setReservationSuccess] = useState(null);
  const [reserveSubmitting, setReserveSubmitting] = useState(false);

  // Review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDishRec, setNewDishRec] = useState('');
  const [reviewsList, setReviewsList] = useState(restaurant.reviews || []);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewToast, setReviewToast] = useState('');

  if (!restaurant) return null;

  // Extract menu categories
  const categories = ['All', ...new Set(restaurant.menu?.map((item) => item.category))];
  const filteredMenuItems = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu?.filter((item) => item.category === selectedCategory);

  const handleMakeReservation = async (e) => {
    e.preventDefault();
    setReserveSubmitting(true);
    try {
      const res = await api.createReservation({
        restaurantId: restaurant._id,
        guestName,
        guestEmail,
        guestPhone,
        partySize,
        date: reserveDate,
        timeSlot: selectedTimeSlot,
        seatingArea,
        specialRequests,
        occasion,
      }, token);

      if (res.success) {
        setReservationSuccess(res.reservation);
      } else {
        alert(res.message || 'Could not complete reservation');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating reservation');
    } finally {
      setReserveSubmitting(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviewSubmitting(true);
    try {
      const res = await api.addRestaurantReview(restaurant._id, {
        userName: user?.name || 'Gourmet Diner',
        rating: newRating,
        comment: newComment,
        dishRecommended: newDishRec,
      }, token);

      if (res.success) {
        setReviewsList(res.reviews);
        setNewComment('');
        setNewDishRec('');
        setReviewToast('Review published successfully!');
        setTimeout(() => setReviewToast(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 my-8">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-950">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          {/* Badges on Cover */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-md">
              {restaurant.diningStyle}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900/80 text-white backdrop-blur-md">
              {restaurant.priceRange}
            </span>
            {restaurant.sponsoredBadge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 flex items-center gap-1 shadow-md">
                <Award className="w-3.5 h-3.5" />
                {restaurant.sponsoredBadge}
              </span>
            )}
            {restaurant.isFeatured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
                Featured Partner
              </span>
            )}
          </div>

          {/* Restaurant Title Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-sm text-white">{restaurant.rating}</span>
              </div>
              <span className="text-xs text-stone-300">({reviewsList.length} verified reviews)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-white">
              {restaurant.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              {restaurant.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-stone-300 pt-3 border-t border-white/10">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {restaurant.address?.street}, {restaurant.address?.neighborhood}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                {restaurant.phone}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                {restaurant.openingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'menu', label: 'Digital Menu & Online Ordering', icon: ShoppingBag },
            { id: 'reserve', label: 'Real-Time Table Reservation', icon: Calendar },
            { id: 'reviews', label: `Diner Reviews (${reviewsList.length})`, icon: Star },
            { id: 'gallery', label: 'Photo Gallery', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-orange-600 text-orange-600 bg-white'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">

          {/* TAB 1: DIGITAL MENU & ONLINE ORDERING */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMenuItems?.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-4 rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between bg-stone-50/50"
                  >
                    <div className="flex gap-4">
                      {dish.image && (
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                            {dish.name}
                          </h4>
                          <span className="font-black text-sm text-orange-600">
                            ${dish.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {dish.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {dish.isSpicy && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 flex items-center gap-0.5">
                              <Flame className="w-3 h-3 text-red-500" />
                              Spicy
                            </span>
                          )}
                          {dish.dietary?.map((diet) => (
                            <span key={diet} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              {diet}
                            </span>
                          ))}
                          {dish.popular && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              ★ Most Ordered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        Made fresh to order
                      </span>
                      <button
                        onClick={() => addItem(dish, restaurant.name, restaurant._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME TABLE RESERVATION */}
          {activeTab === 'reserve' && (
            <div className="max-w-2xl mx-auto">
              {reservationSuccess ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">
                    Table Reserved Confirmed!
                  </h3>
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-stone-500">Confirmation Code:</span>
                      <span className="font-mono font-bold text-stone-900">{reservationSuccess.confirmationCode}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-stone-500">Restaurant:</span>
                      <span className="font-bold text-stone-900">{restaurant.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-stone-500">Date & Time:</span>
                      <span className="font-bold text-stone-900">{reservationSuccess.date} at {reservationSuccess.timeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-stone-500">Party Size:</span>
                      <span className="font-bold text-stone-900">{reservationSuccess.partySize} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Seating Area:</span>
                      <span className="font-bold text-stone-900">{reservationSuccess.seatingArea}</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-800">
                    A confirmation notice has been dispatched to {reservationSuccess.guestEmail}. We look forward to welcoming you!
                  </p>
                  <button
                    onClick={() => setReservationSuccess(null)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                  >
                    Reserve Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMakeReservation} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Reserve a Table at {restaurant.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Instant table confirmation. No reservation fees.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Date</label>
                      <input
                        type="date"
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-orange-500"
                        required
                      />
                    </div>

                    {/* Party size */}
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Party Size</label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-orange-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-2">Available Time Slots</label>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.reservationSettings?.timeSlots?.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            selectedTimeSlot === slot.time
                              ? 'bg-orange-600 text-white shadow-md'
                              : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seating Area */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-2">Preferred Seating Area</label>
                    <div className="grid grid-cols-2 gap-2">
                      {restaurant.reservationSettings?.seatingAreas?.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setSeatingArea(area)}
                          className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                            seatingArea === area
                              ? 'border-orange-600 bg-orange-50 text-orange-900'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Email</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Phone</label>
                      <input
                        type="text"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Special Dietary Requests or Notes (Optional)</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Anniversaries, birthday dessert candle, wheelchair access..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white h-20"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={reserveSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{reserveSubmitting ? 'Confirming Table...' : 'Confirm Table Reservation'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: VERIFIED REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Write Review Form */}
              <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Leave a Verified Diner Review
                </h4>
                {reviewToast && (
                  <p className="text-xs font-bold text-emerald-600">{reviewToast}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-600">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your culinary experience, ambiance feedback, service..."
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-orange-500 h-20"
                  required
                ></textarea>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <input
                    type="text"
                    value={newDishRec}
                    onChange={(e) => setNewDishRec(e.target.value)}
                    placeholder="Recommended dish (e.g. Truffle Tagliolini)"
                    className="w-full sm:w-80 text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                  />
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-900">{rev.userName}</p>
                          <p className="text-[10px] text-stone-400">Verified Diner</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed">
                      {rev.comment}
                    </p>

                    {rev.dishRecommended && (
                      <div className="text-[11px] font-semibold text-orange-600">
                        Dish Recommended: {rev.dishRecommended}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {restaurant.gallery?.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden aspect-square bg-stone-100 shadow-sm">
                  <img
                    src={img}
                    alt="Gallery item"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
