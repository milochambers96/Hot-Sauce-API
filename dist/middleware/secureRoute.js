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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
function secureRoute(req, res, next) {
    console.log("Hello, This is a secure route");
    const rawToken = req.headers.authorization;
    if (!rawToken) {
        return res
            .status(401)
            .json({ message: "Unauthorized. No Auth header found." });
    }
    // Extract the token from the "Bearer " prefix
    const token = rawToken.replace("Bearer ", "");
    console.log("Token extracted:", token);
    jsonwebtoken_1.default.verify(token, "secret sauce", // Make sure this matches the secret used for signing
    (err, payload) => __awaiter(this, void 0, void 0, function* () {
        if (err || !payload) {
            console.error("Error or payload not found:", err);
            return res.status(401).json({ message: "Unauthorized. Invalid JWT." });
        }
        console.log("Valid token! The payload is:", payload);
        const jwtPayload = payload;
        const userId = jwtPayload.userId;
        const user = yield users_1.default.findById(userId);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not found. Invalid JWT!" });
        }
        // Attach user to the request object
        req.currentUser = user;
        next(); // Proceed to the next middleware
    }));
}
exports.default = secureRoute;
