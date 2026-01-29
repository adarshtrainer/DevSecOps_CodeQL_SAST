import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  price: Number,
  demoUrl: String,
  fullUrl: String
});

export default mongoose.model("Project", projectSchema);
