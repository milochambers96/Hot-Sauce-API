"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const producerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    jurisdiction: { type: String, required: true },
    city: { type: String },
    sauces: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Sauce" }],
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.default = mongoose_1.default.model("Producer", producerSchema);
