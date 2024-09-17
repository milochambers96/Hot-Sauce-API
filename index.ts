import express from "express";
import mongoose from "mongoose";
import {
  getSauces,
  getSauceById,
  getSauceByHeat,
  createSauce,
  deleteSauce,
  updateSauce,
} from "./controllers/sauceControllers";
import { signup, login } from "./controllers/userControllers";
import {
  createProducer,
  getProducers,
  getProducerById,
} from "./controllers/producerController";
import secureRoute from "./middleware/secureRoute";

const app = express();

const router = express.Router();

//!User Routes
//posting  a userprofile
router.route("/api/signup").post(signup);
router.route("/api/login").post(login);

//! Public Sauce DB Routes
// getting All Sauces
router.route("/api/hot-sauces").get(getSauces);
// getting an individual sauce
router.route("/api/hot-sauces/:sauceId").get(getSauceById);
// Getting specific sauces by heat
router.route("/api/hot-sauces/heat/:heatLvl").get(getSauceByHeat);

//! Secure Sauce DB Routes
// Adding a new sauce - posting
router.route("/api/hot-sauces").post(secureRoute, createSauce);
// deleting from DB - delete
router.route("/api/hot-sauces/:sauceId").delete(secureRoute, deleteSauce);
// putting from DB, editing data
router.route("/api/hot-sauces/:sauceId").put(secureRoute, updateSauce);

//! Public producer routes
router.route("/api/sauce-producers").get(getProducers);
router.route("/api/sauce-producers").post(secureRoute, createProducer);
router.route("/api/sauce-producers/:producerId").get(getProducerById);

// ! To get POSTing to work, we need to add this line:
app.use(express.json());

app.use(router);

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hotSauces");
  console.log("Connected to database");
  app.listen(8000, () => {
    console.log("Express API is running on http://localhost:8000");
  });
}

start();
