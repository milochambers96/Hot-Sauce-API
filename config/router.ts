import express from "express";
import {
  getSauces,
  getSauceById,
  getSauceByHeat,
  createSauce,
  deleteSauce,
  updateSauce,
} from "../controllers/sauceControllers";
import { signup, login } from "../controllers/userControllers";
import {
  createProducer,
  getProducers,
  getProducerById,
} from "../controllers/producerController";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewControllers";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/hot-sauces").get(getSauces).post(secureRoute, createSauce);

router
  .route("/hot-sauces/:sauceId")
  .get(getSauceById)
  .delete(secureRoute, deleteSauce)
  .put(secureRoute, updateSauce);

router.route("/hot-sauces/heat/:heatLvl").get(getSauceByHeat);

router
  .route("/sauce-producers")
  .get(getProducers)
  .post(secureRoute, createProducer);
router.route("/sauce-producers/:producerId").get(getProducerById);

router.route("/hot-sauces/:sauceId/reviews").post(secureRoute, createReview);

router
  .route("/hot-sauces/:sauceId/reviews/:reviewId")
  .put(secureRoute, updateReview)
  .delete(secureRoute, deleteReview);

export default router;
