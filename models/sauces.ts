import mongoose, { Schema, model, Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

interface ISauce {
  name: string;
  heatLvl: "mild" | "medium" | "hot" | "super hot";
  scoville: number;
  flavourProfile: string[];
  image: string;
  reviews: [];
  producer?: Types.ObjectId[];
  user: Types.ObjectId;
}

const sauceSchema: Schema<ISauce> = new Schema({
  name: { type: String, required: true },
  heatLvl: {
    type: String,
    required: true,
    enum: ["mild", "medium", "hot", "super hot"],
  },
  scoville: { type: Number, required: true },
  flavourProfile: { type: [String] },
  image: { type: String, required: true },
  reviews: [reviewSchema],
  producer: [{ type: Schema.Types.ObjectId, ref: "Producer" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Sauce = model<ISauce>("Sauce", sauceSchema);

export default Sauce;
