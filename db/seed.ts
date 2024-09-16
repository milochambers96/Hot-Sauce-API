import mongoose from "mongoose";
import Sauces from "../models/sauces";
import Producers from "../models/producers";
import Users from "../models/users";

const adminUser = {
  username: "HotSauce",
  email: "hot@sauce.com",
  password: "Hotsauce123!",
};

// ! This is a program to put data into the database.
async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hotSauces");
  console.log("Connected to the Hot Sauce DB");
  await Sauces.deleteMany();
  await Producers.deleteMany();
  await Users.deleteMany();
  console.log("Remove existing data.");
  const user = await Users.create(adminUser);

  const producerData = {
    name: "Angry Goat Pepper Co",
    user: user,
    jurisdiction: "United States",
    city: "Bradford, Vermont",
  };

  const producer = await Producers.create(producerData);
  const producerId = producer._id;

  const hotSauceData = {
    name: "Angry Goat Blistered Shishito & Garlic Hot Sauce",
    producer: [producerId],
    user,
    heatLvl: "mild",
    scoville: 5800,
    flavourProfile: ["Shishito pepper", "Garlic"],
    image:
      "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024115_161216_769-01.jpg?v=1713283722&width=900",
  };

  const savedSauces = await Sauces.create(hotSauceData);
  await Producers.findByIdAndUpdate(
    producerId,
    { sauces: [savedSauces._id] },
    { new: true }
  );

  console.log("Here are our saved sauces", savedSauces);

  await mongoose.disconnect();
}

seed();

// {
//   name: "Dawson's Hot Sauce",
//   user,
//   jurisdiction: "Canada",
//   city: "Hamilton, Ontario",
// },

// {
//   name: "Dawson's Zuzu's 7-Pot Hot Sauce",
//   // producer: "Dawson's",
//   user,
//   heatLvl: "super hot",
//   scoville: 620000,
//   flavourProfile: ["7-Pot Pepper", "Liquorice", "Maple Syrup"],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024110_135252_272-01.jpg?v=1713283717&width=900",
// },
// {
//   name: "Ginger Goat Tropic Star Hot Sauce",
//   // producer: "Ginger Goat",
//   user,
//   heatLvl: "hot",
//   scoville: 110000,
//   flavourProfile: [
//     "Super hot peach peppers",
//     "Mango",
//     "Lemongrass",
//     "Star Anise",
//   ],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024131_151419_185.jpg?v=1713283726&width=640",
// },
// {
//   name: "Djablo Power Jab Hot Sauce",
//   // producer: "Djablo Sauce",
//   user,
//   heatLvl: "hot",
//   scoville: 55000,
//   flavourProfile: ["Serrano pepper", "Ginger", "Garlic"],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024612_11423_827.jpg?v=1718189158&width=900",
// },
// {
//   name: "Pisqueya Passion Fruit Spicy Sweet Hot Sauce",
//   // producer: "Pisqueya",
//   user,
//   heatLvl: "mild",
//   scoville: 16000,
//   flavourProfile: ["Caribean chili pepper", "Passion fruit"],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2023104_14225_300-01.jpg?v=1713283664&width=900",
// },
// {
//   name: "Hot Ones The Last Dab",
//   // producer: "Hot Ones",
//   user,
//   heatLvl: "super hot",
//   scoville: 2693000,
//   flavourProfile: ["Pepper X", "Flora"],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024326_17580_172-02.jpg?v=1713283762&width=900",
// },
// {
//   name: "Da Bomb Beyond Insanity Hot Sauce",
//   // producer: "Da' Bomb",
//   user,
//   heatLvl: "super hot",
//   scoville: 135600,
//   flavourProfile: ["Habanero peppers"],
//   image:
//     "https://www.hopburnsblack.co.uk/cdn/shop/products/store_carmera_20211119_161458_434.jpg?v=1713283230&width=900",
// },
