"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sauces_1 = __importDefault(require("../models/sauces"));
const producers_1 = __importDefault(require("../models/producers"));
const users_1 = __importDefault(require("../models/users"));
const adminUser = {
    username: "HotSauce",
    email: "hot@sauce.com",
    password: "Hotsauce123!",
};
// ! This is a program to put data into the database.
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/hotSauces");
        console.log("Connected to the Hot Sauce DB");
        yield sauces_1.default.deleteMany();
        yield producers_1.default.deleteMany();
        yield users_1.default.deleteMany();
        console.log("Remove existing data.");
        const user = yield users_1.default.create(adminUser);
        const producerData = [
            {
                name: "Angry Goat Pepper Co",
                user: user,
                sauces: [],
                jurisdiction: "United States",
                city: "Bradford, Vermont",
            },
            {
                name: "Dawson's Hot Sauce",
                user: user,
                sauces: [],
                jurisdiction: "Canada",
                city: "Hamilton, Ontario",
            },
        ];
        const producerArray = yield producers_1.default.create(producerData);
        const hotSauceData = [
            {
                name: "Angry Goat Blistered Shishito & Garlic Hot Sauce",
                producer: producerArray[0]._id,
                user,
                heatLvl: "mild",
                scoville: 5800,
                flavourProfile: ["Shishito pepper", "Garlic"],
                image: "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024115_161216_769-01.jpg?v=1713283722&width=900",
            },
            {
                name: "Dawson's Zuzu's 7-Pot Hot Sauce",
                producer: producerArray[1]._id,
                user,
                heatLvl: "super hot",
                scoville: 620000,
                flavourProfile: ["7-Pot Pepper", "Liquorice", "Maple Syrup"],
                image: "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024110_135252_272-01.jpg?v=1713283717&width=900",
            },
        ];
        const savedSauces = yield sauces_1.default.create(hotSauceData);
        const updateProducers = savedSauces.map((sauce, index) => {
            return producers_1.default.findByIdAndUpdate(sauce.producer, { $push: { sauces: sauce._id } }, { new: true });
        });
        yield Promise.all(updateProducers);
        // const savedSauces = await Sauces.create(hotSauceData);
        // await Producers.findByIdAndUpdate(
        //   producerId,
        //   { sauces: [savedSauces._id] },
        //   { new: true }
        // );
        console.log("Here are our saved sauces", savedSauces);
        yield mongoose_1.default.disconnect();
    });
}
seed();
