import Sauces from "../models/sauces";
import { Request, Response } from "express";

export const getSauces = async (req: Request, res: Response) => {
  try {
    // finding the sauces in the DB
    const obtainedSauce = await Sauces.find();
    console.log("Obtained these from sauce db", obtainedSauce);
    // sending it back to the client
    res.send(obtainedSauce);
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
    res.status(500).send({
      message: "Sauces not found, please try searching with '/api/hot-sauces'",
    });
  }
};

export const getSauceById = async (req: Request, res: Response) => {
  try {
    //using the client's request to fill the wildcard
    const sauceId = req.params.sauceId;
    console.log("Requested sauce Id:", sauceId);
    // using find by ID to find the collection that matches the client's request.
    const obtainedSauce = await Sauces.findById(sauceId).populate("producer");
    console.log("The requested sauce is", obtainedSauce);
    //sending the found sauce back to the client.
    res.send(obtainedSauce);
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
    res.send({
      message: "No sauces found. Did you provide a valid sauceId?",
    });
  }
};

export const getSauceByHeat = async (req: Request, res: Response) => {
  try {
    const heatLvlSearch = req.params.heatLvl;
    const validHeatSearch = ["mild", "medium", "hot", "very hot"];
    if (validHeatSearch.includes(heatLvlSearch)) {
      const obtainedSauces = await Sauces.find({ heatLvl: heatLvlSearch });
      console.log(`All ${heatLvlSearch} sauces grabbed`);
      res.send(obtainedSauces);
    } else {
      res.send({
        message: "Unable to find a sauce. Did you provide a valid heat level?",
      });
    }
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
    res.send({ message: "Please search by a valid heat lvl" });
  }
};

export const createSauce = async (req: Request, res: Response) => {
  try {
    console.log(
      "The request to create a sauce is coming from this user:",
      req.currentUser
    );
    req.body.user = req.currentUser._id;
    const incomingSauce = req.body;
    const newSauce = await Sauces.create(incomingSauce);
    console.log(`Just added ${newSauce} to the condiment cupboard`);
    res.send(newSauce);
  } catch (error) {
    error instanceof Error
      ? console.error(error.message)
      : console.error(error);
    res.send({
      message:
        "Unable to add the sauce. Did you complete all the required fields?",
    });
  }
};

export const deleteSauce = async (req: Request, res: Response) => {
  try {
    console.log("delete request from user", req.currentUser);
    const sauceId = req.params.sauceId;
    const sauceDoc = await Sauces.findById(sauceId);

    const sauceOwnerId = (sauceDoc as any)?.user;
    console.log("The sauce you're trying to delete is owned by", sauceOwnerId);
    if (req.currentUser._id.equals(sauceOwnerId)) {
      const removedSauce = await Sauces.findByIdAndDelete(sauceId);
      console.log("The following sauce was removed", removedSauce);
      res.send(removedSauce);
    } else {
      res.json({ message: "You shouldn't touch other peoples sauces" });
    }
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
    res.send({
      message:
        "Unable to locate a sauce to remove. Did you provide a valid sauceId?",
    });
  }
};

export const updateSauce = async (req: Request, res: Response) => {
  try {
    console.log("Update request from user", req.currentUser);
    const sauceId = req.params.sauceId;

    const sauceDoc = await Sauces.findById(sauceId);
    const sauceOwnerId = (sauceDoc as any)?.user;
    console.log("The sauce you're trying to update is owned by", sauceOwnerId);

    if (req.currentUser._id.equals(sauceOwnerId)) {
      const updatedData = req.body;
      const updatedSauce = await Sauces.findByIdAndUpdate(
        sauceId,
        updatedData,
        {
          new: true,
        }
      );
      console.log("The following sauce was updated:", updatedSauce);
      res.send(updatedSauce);
    } else {
      res.json({ message: "You shouldn't touch other peoples sauces" });
    }
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
    res.send({
      message:
        "Unable to locate a sauce to edit. Did you provide a valid SauceId",
    });
  }
};
