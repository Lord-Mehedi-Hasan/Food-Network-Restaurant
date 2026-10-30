const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { optionalAuth, requireAuth } = require('../middleware/auth');

// Create new food delivery / pickup / beverage order
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      restaurantId,
      restaurantName,
      orderType = 'delivery',
      customer,
      deliveryAddress,
      items,
      paymentMethod = 'credit_card',
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain items' });
    }

    if (!customer?.name || !customer?.email) {
      return res.status(400).json({ success: false, message: 'Customer details are required' });
    }

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const tax = Number((subtotal * 0.0825).toFixed(2));
    const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
    const serviceFee = 2.49;
    const commissionAmount = Number((subtotal * 0.12).toFixed(2)); // 12% platform fee
    const total = Number((subtotal + tax + deliveryFee + serviceFee).toFixed(2));

    const orderNumber = `FN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const order = await Order.create({
      orderNumber,
      user: req.user?._id || null,
      restaurant: restaurantId || null,
      restaurantName: restaurantName || 'Food Network Culinary Market',
      orderType,
      customer,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      items,
      subtotal,
      tax,
      deliveryFee,
      serviceFee,
      commissionAmount,
      total,
      status: 'received',
      paymentMethod,
      paymentStatus: 'paid',
      estimatedDeliveryTime: orderType === 'delivery' ? '30-40 min' : '15-20 min',
      statusHistory: [
        {
          status: 'received',
          timestamp: new Date(),
          message: 'Order received and confirmed with culinary team',
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order by ID or orderNumber for live tracking
router.get('/:idOrOrderNumber', async (req, res) => {
  try {
    const { idOrOrderNumber } = req.params;
    let order;
    if (idOrOrderNumber.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(idOrOrderNumber);
    } else {
      order = await Order.findOne({ orderNumber: idOrOrderNumber });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status (Simulation / Partner action)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const messages = {
      received: 'Order confirmed with kitchen',
      preparing: 'Chef is handcrafting your culinary order',
      on_the_way: 'Courier picked up order and is on the way',
      ready_for_pickup: 'Your feast is freshly packed and ready at the counter',
      delivered: 'Order successfully delivered! Bon Appetit!',
      cancelled: 'Order has been cancelled',
    };

    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      message: note || messages[status] || `Status updated to ${status}`,
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user order history
router.get('/', optionalAuth, async (req, res) => {
  try {
    const filter = {};
    if (req.user) {
      filter.$or = [{ user: req.user._id }, { 'customer.email': req.user.email }];
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(30);
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
