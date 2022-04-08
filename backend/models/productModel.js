const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name of product!"],
  },
  description: {
    type: String,
    required: [true, "Please provide description of product!"],
  },
  category: {
    type: String,
    required: [true, "Please provide category of product!"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price of product!"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = model("Product", ProductSchema);
