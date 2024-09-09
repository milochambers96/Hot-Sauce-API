"use strict";
// * This file is responsible for defining your own model (type) for your data (movie)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ! A model is a structure for how the data needs to be.
// ! It's something that mongoose requires.
// ! Think of it like defining a REQUIRED typescript interface.
const mongoose_1 = __importDefault(require("mongoose"));
// ! Make a schema (structure for the data)
const movieSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true }
});
// ! We export our schema as new model, by using the .model method on mongoose.
// ! VERY IMPORTANT 🚨: First character needs to be uppercase, e.g. Movie
// ! Also recommend not pluralising. 
// ? The second argument is the schema we just made.
exports.default = mongoose_1.default.model('Movie', movieSchema);
