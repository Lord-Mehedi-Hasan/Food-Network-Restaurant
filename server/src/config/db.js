const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_network_db';
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning]: Unable to connect to MongoDB directly: ${error.message}`);
    console.warn(`[MongoDB Notice]: Server will remain operational with fallback mode.`);
  }
};

module.exports = connectDB;
