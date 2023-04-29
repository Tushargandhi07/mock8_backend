const mongoose = require('mongoose');
require('dotenv').config()

const restaurantSchema = mongoose.Schema(
    {
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
          name: String,
          description: String,
          price: Number,
          image: String
        }]
      }
);
const Restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports={
    Restaurant
}
