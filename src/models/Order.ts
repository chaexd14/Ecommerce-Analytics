import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: Number,
  date: String,
  region: String,
  category: String,
  quantity: Number,
  sales: Number,
  profit: Number,
  sales_normalized: Number,
});

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;