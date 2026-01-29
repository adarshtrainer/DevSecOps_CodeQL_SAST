import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: String,
  projectId: String,
  status: { type: String, default: "paid" }
});

export default mongoose.model("Purchase", purchaseSchema);
