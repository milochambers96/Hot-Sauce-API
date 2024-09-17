import mongoose, { Schema, model, Types } from "mongoose";

interface IReview {
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
  user: Types.ObjectId;
}

const reviewSchema: Schema<IReview> = new Schema(
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
  reviews: Types.DocumentArray<IReview>;
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
