import mongoose, { Schema } from "mongoose";

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jurisdiction: { type: String, required: true },
  city: { type: String },
  sauces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sauce" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Producer", producerSchema);
