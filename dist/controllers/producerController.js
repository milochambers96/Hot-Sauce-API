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
exports.getProducers = exports.createProducer = void 0;
const producers_1 = __importDefault(require("../models/producers"));
const createProducer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("The req to create this producer is coming from:", req.currentUser);
        req.body.user = req.currentUser._id;
        const incomingProducer = req.body;
        const newProducer = yield producers_1.default.create(incomingProducer);
        console.log("The following producer has been added", newProducer);
        res.send(newProducer);
    }
    catch (error) {
        error instanceof Error
            ? console.error(error.message)
            : console.error(error);
        res.send({
            message: "Unable to add the producer. Did you complete all the required fields?",
        });
    }
});
exports.createProducer = createProducer;
const getProducers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obtainedProducers = yield producers_1.default.find();
        res.send(obtainedProducers);
    }
    catch (error) {
        error instanceof Error
            ? console.error(error.message)
            : console.error(error);
        res.status(500).send({
            message: "Sauces not found, please try searching with '/api/sauce-producers'",
        });
    }
});
exports.getProducers = getProducers;
