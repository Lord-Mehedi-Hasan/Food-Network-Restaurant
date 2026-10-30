const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemId: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  specialNotes: String,
  image: String,
  category: String,
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  restaurantName: {
    type: String,
    default: 'Food Network Culinary Market',
  },
  orderType: {
    type: String,
    enum: ['delivery', 'pickup', 'beverage_shipment'],
    default: 'delivery',
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  deliveryAddress: {
    street: String,
    apt: String,
    city: String,
    state: String,
    zip: String,
    instructions: String,
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  serviceFee: { type: Number, default: 2.50 },
  commissionAmount: { type: Number, default: 0 }, // For restaurant marketplace monetization
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['received', 'preparing', 'on_the_way', 'delivered', 'ready_for_pickup', 'cancelled'],
    default: 'received',
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'apple_pay', 'google_pay', 'cash_on_delivery'],
    default: 'credit_card',
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'paid',
  },
  estimatedDeliveryTime: String,
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    message: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
