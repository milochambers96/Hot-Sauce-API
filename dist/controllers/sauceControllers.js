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
exports.updateSauce = exports.deleteSauce = exports.createSauce = exports.getSauceByHeat = exports.getSauceById = exports.getSauces = void 0;
const sauces_1 = __importDefault(require("../models/sauces"));
const getSauces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // finding the sauces in the DB
        const obtainedSauce = yield sauces_1.default.find();
        console.log("Obtained these from sauce db", obtainedSauce);
        // sending it back to the client
        res.send(obtainedSauce);
    }
    catch (error) {
        error instanceof Error ? console.log(error.message) : console.log(error);
        res.status(500).send({
            message: "Sauces not found, please try searching with '/api/hot-sauces'",
        });
    }
});
exports.getSauces = getSauces;
const getSauceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //using the client's request to fill the wildcard
        const sauceId = req.params.sauceId;
        console.log("Requested sauce Id:", sauceId);
        // using find by ID to find the collection that matches the client's request.
        const obtainedSauce = yield sauces_1.default.findById(sauceId).populate("producer");
        console.log("The requested sauce is", obtainedSauce);
        //sending the found sauce back to the client.
        res.send(obtainedSauce);
    }
    catch (error) {
        error instanceof Error ? console.log(error.message) : console.log(error);
        res.send({
            message: "No sauces found. Did you provide a valid sauceId?",
        });
    }
});
exports.getSauceById = getSauceById;
const getSauceByHeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const heatLvlSearch = req.params.heatLvl;
        const validHeatSearch = ["mild", "medium", "hot", "very hot"];
        if (validHeatSearch.includes(heatLvlSearch)) {
            const obtainedSauces = yield sauces_1.default.find({ heatLvl: heatLvlSearch });
            console.log(`All ${heatLvlSearch} sauces grabbed`);
            res.send(obtainedSauces);
        }
        else {
            res.send({
                message: "Unable to find a sauce. Did you provide a valid heat level?",
            });
        }
    }
    catch (error) {
        error instanceof Error ? console.log(error.message) : console.log(error);
        res.send({ message: "Please search by a valid heat lvl" });
    }
});
exports.getSauceByHeat = getSauceByHeat;
const createSauce = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("The request to create a sauce is coming from this user:", req.currentUser);
        req.body.user = req.currentUser._id;
        const incomingSauce = req.body;
        const newSauce = yield sauces_1.default.create(incomingSauce);
        console.log(`Just added ${newSauce} to the condiment cupboard`);
        res.send(newSauce);
    }
    catch (error) {
        error instanceof Error
            ? console.error(error.message)
            : console.error(error);
        res.send({
            message: "Unable to add the sauce. Did you complete all the required fields?",
        });
    }
});
exports.createSauce = createSauce;
const deleteSauce = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("delete request from user", req.currentUser);
        const sauceId = req.params.sauceId;
        const sauceDoc = yield sauces_1.default.findById(sauceId);
        const sauceOwnerId = sauceDoc === null || sauceDoc === void 0 ? void 0 : sauceDoc.user;
        console.log("The sauce you're trying to delete is owned by", sauceOwnerId);
        if (req.currentUser._id.equals(sauceOwnerId)) {
            const removedSauce = yield sauces_1.default.findByIdAndDelete(sauceId);
            console.log("The following sauce was removed", removedSauce);
            res.send(removedSauce);
        }
        else {
            res.json({ message: "You shouldn't touch other peoples sauces" });
        }
    }
    catch (error) {
        error instanceof Error ? console.log(error.message) : console.log(error);
        res.send({
            message: "Unable to locate a sauce to remove. Did you provide a valid sauceId?",
        });
    }
});
exports.deleteSauce = deleteSauce;
const updateSauce = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Update request from user", req.currentUser);
        const sauceId = req.params.sauceId;
        const sauceDoc = yield sauces_1.default.findById(sauceId);
        const sauceOwnerId = sauceDoc === null || sauceDoc === void 0 ? void 0 : sauceDoc.user;
        console.log("The sauce you're trying to update is owned by", sauceOwnerId);
        if (req.currentUser._id.equals(sauceOwnerId)) {
            const updatedData = req.body;
            const updatedSauce = yield sauces_1.default.findByIdAndUpdate(sauceId, updatedData, {
                new: true,
            });
            console.log("The following sauce was updated:", updatedSauce);
            res.send(updatedSauce);
        }
        else {
            res.json({ message: "You shouldn't touch other peoples sauces" });
        }
    }
    catch (error) {
        error instanceof Error ? console.log(error.message) : console.log(error);
        res.send({
            message: "Unable to locate a sauce to edit. Did you provide a valid SauceId",
        });
    }
});
exports.updateSauce = updateSauce;
