// * This file is responsible for defining your own model (type) for your data (hot sauces)

import mongoose from "mongoose";

const sauceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heatLvl: {
    type: String,
    required: true,
    enum: ["mild", "medium", "hot", "super hot"],
  },
  scoville: { type: Number, required: true },
  flavourProfile: { type: Array },
  image: { type: String, required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Sauce", sauceSchema);
