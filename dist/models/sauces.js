"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const sauceSchema = new mongoose_1.Schema({
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
    producer: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Producer" }],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
const Sauce = (0, mongoose_1.model)("Sauce", sauceSchema);
exports.default = Sauce;
