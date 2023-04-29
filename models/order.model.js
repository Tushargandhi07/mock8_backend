const mongoose = require('mongoose');
require('dotenv').config()

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{
      name: String,
      price: Number,
      quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    // status: String // e.g, "placed", "preparing", "on the way", "delivered"
    status:{
      type:String,
      enum: ["placed","preparing","on the way","delivered"]
    }
  }
);
const Order = mongoose.model('order', orderSchema);
module.exports = {
  Order
}