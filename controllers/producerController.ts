import Producers from "../models/producers";
import { Request, Response } from "express";

export const createProducer = async (req: Request, res: Response) => {
  try {
    console.log(
      "The req to create this producer is coming from:",
      req.currentUser
    );
    req.body.user = req.currentUser._id;
    const incomingProducer = req.body;
    const newProducer = await Producers.create(incomingProducer);
    console.log("The following producer has been added", newProducer._id);

    res.send(newProducer);
  } catch (error) {
    error instanceof Error
      ? console.error(error.message)
      : console.error(error);
    res.send({
      message:
        "Unable to add the producer. Did you complete all the required fields?",
    });
  }
};

export const getProducers = async (req: Request, res: Response) => {
  try {
    const obtainedProducers = await Producers.find();
    res.send(obtainedProducers);
  } catch (error) {
    error instanceof Error
      ? console.error(error.message)
      : console.error(error);
    res.status(500).send({
      message:
        "Producer not found, please try searching with '/api/sauce-producers'",
    });
  }
};

export const getProducerById = async (req: Request, res: Response) => {
  try {
    const producerId = req.params.producerId;
    console.log("The requested producer ID is:", producerId);
    const obtainedProducer = await Producers.findById(producerId).populate(
      "sauces"
    );
    res.send(obtainedProducer);
  } catch (error) {
    error instanceof Error
      ? console.error(error.message)
      : console.error(error);
    res.status(500).send({
      message:
        "Producer not found, please try searching with '/api/sauce-producers'",
    });
  }
};
