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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const sauceControllers_1 = require("./controllers/sauceControllers");
const userControllers_1 = require("./controllers/userControllers");
const producerController_1 = require("./controllers/producerController");
const secureRoute_1 = __importDefault(require("./middleware/secureRoute"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
//!User Routes
//posting  a userprofile
router.route("/api/signup").post(userControllers_1.signup);
router.route("/api/login").post(userControllers_1.login);
//! Public Sauce DB Routes
// getting All Sauces
router.route("/api/hot-sauces").get(sauceControllers_1.getSauces);
// getting an individual sauce
router.route("/api/hot-sauces/:sauceId").get(sauceControllers_1.getSauceById);
// Getting specific sauces by heat
router.route("/api/hot-sauces/heat/:heatLvl").get(sauceControllers_1.getSauceByHeat);
//! Secure Sauce DB Routes
// Adding a new sauce - posting
router.route("/api/hot-sauces").post(secureRoute_1.default, sauceControllers_1.createSauce);
// deleting from DB - delete
router.route("/api/hot-sauces/:sauceId").delete(secureRoute_1.default, sauceControllers_1.deleteSauce);
// putting from DB, editing data
router.route("/api/hot-sauces/:sauceId").put(secureRoute_1.default, sauceControllers_1.updateSauce);
//! Public producer routes
router.route("/api/sauce-producers").get(producerController_1.getProducers);
router.route("/api/sauce-producers").post(secureRoute_1.default, producerController_1.createProducer);
// ! To get POSTing to work, we need to add this line:
app.use(express_1.default.json());
app.use(router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/hotSauces");
        console.log("Connected to database");
        app.listen(8000, () => {
            console.log("Express API is running on http://localhost:8000");
        });
    });
}
start();
// "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmUzMTczYzY2OTdlNjU4NTE3OWYzZGUiLCJlbWFpbCI6ImhvdEBzYXVjZTIyMi5jb20iLCJpYXQiOjE3MjYxNTg2OTIsImV4cCI6MTcyODc1MDY5Mn0.gT_uA4B87iPVNjQCsLxUua_pmZ7QUU_ndmZHKbLKbR0"
