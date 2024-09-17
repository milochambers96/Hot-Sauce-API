import { Request, Response } from "express";
import Sauces from "../models/sauces";
import mongoose from "mongoose";

export const createReview = async (req: Request, res: Response) => {
  const sauce = await Sauces.findById(req.params.sauceId);

  if (!sauce) {
    return res
      .status(404)
      .send({ message: "Sauce not found. Did you enter a valid sauce ID?" });
  }

  const user = req.currentUser._id;
  const newReview = { ...req.body, user };

  sauce.reviews.push(newReview);

  const updatedSauce = await sauce.save();

  return res.status(201).json(updatedSauce);
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const sauce = await Sauces.findById(req.params.sauceId);

    if (!sauce) {
      return res
        .status(404)
        .send({ message: "Sauce not found. Did you enter a valid sauce ID?" });
    }

    const review = sauce.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).send({ message: "Review not found." });
    }

    if (!review.user.equals(req.currentUser._id)) {
      return res.status(401).send({
        message: "Unauthorized, you cannot change another user's review",
      });
    }

    review.set(req.body);

    const updatedSauce = await sauce.save();

    return res.status(200).json(updatedSauce);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const sauce = await Sauces.findById(req.params.sauceId);

    if (!sauce) {
      return res.status(404).send({
        message: "Sauce not found. Did you enter a valid sauce ID?",
      });
    }

    // const reviews = sauce.reviews as any;
    // const review = reviews.id(req.params.reviewId);
    const review = sauce.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).send({ message: "Review not found." });
    }

    if (!review.user.equals(req.currentUser._id)) {
      return res.status(401).send({
        message:
          "Unauthorized, we believe in the freedom of speech, only the author can delete a review.",
      });
    }

    sauce.reviews.pull({ _id: req.params.reviewId });
    const updatedSauce = await sauce.save();

    return res.status(200).json(updatedSauce);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
