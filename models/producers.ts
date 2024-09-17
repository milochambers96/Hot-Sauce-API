import mongoose, { Schema, model, Types } from "mongoose";

interface IProducer {
  name: string;
  jurisdiction: string;
  city: string;
  sauces: Types.ObjectId[];
  user: Types.ObjectId;
}

const producerSchema: Schema<IProducer> = new Schema({
  name: { type: String, required: true },
  jurisdiction: { type: String, required: true },
  city: { type: String },
  sauces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sauce" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Producer = model<IProducer>("Producer", producerSchema);

export default Producer;
