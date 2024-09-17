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
  const producerArray = await Producers.create(producerData);

  const hotSauceData = [
    {
      name: "Angry Goat Blistered Shishito & Garlic Hot Sauce",
      producer: producerArray[0]._id,
      user,
      heatLvl: "mild",
      scoville: 5800,
      flavourProfile: ["Shishito pepper", "Garlic"],
      image:
        "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024115_161216_769-01.jpg?v=1713283722&width=900",
    },
    {
      name: "Dawson's Zuzu's 7-Pot Hot Sauce",
      producer: producerArray[1]._id,
      user,
      heatLvl: "super hot",
      scoville: 620000,
      flavourProfile: ["7-Pot Pepper", "Liquorice", "Maple Syrup"],
      image:
        "https://www.hopburnsblack.co.uk/cdn/shop/files/store-carmera_2024110_135252_272-01.jpg?v=1713283717&width=900",
    },
  ];

  const savedSauces = await Sauces.create(hotSauceData);

  const updateProducers = savedSauces.map((sauce, index) => {
    return Producers.findByIdAndUpdate(
      sauce.producer,
      { $push: { sauces: sauce._id } },
      { new: true }
    );
  });

  await Promise.all(updateProducers);
  // const savedSauces = await Sauces.create(hotSauceData);
  // await Producers.findByIdAndUpdate(
  //   producerId,
  //   { sauces: [savedSauces._id] },
  //   { new: true }
  // );

  console.log("Here are our saved sauces", savedSauces);

  await mongoose.disconnect();
}

seed();
