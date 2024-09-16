"use strict";
// * This file is responsible for defining your own model (type) for your data (hot sauces)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sauceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    heatLvl: {
        type: String,
        required: true,
        enum: ["mild", "medium", "hot", "super hot"],
    },
    scoville: { type: Number, required: true },
    flavourProfile: { type: Array },
    image: { type: String, required: true },
    producer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Producer" },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.default = mongoose_1.default.model("Sauce", sauceSchema);
