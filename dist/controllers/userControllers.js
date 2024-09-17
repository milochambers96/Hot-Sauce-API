"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.signup = void 0;
const users_1 = __importStar(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userProfile = express_mongo_sanitize_1.default.sanitize(req.body);
        if (req.body.password === req.body.passwordConfirmation) {
            const newUser = yield users_1.default.create(userProfile);
            console.log("The following user profile has been created, ", newUser);
            res.send(newUser);
        }
        else {
            res.send({
                message: "Password and password confirmation did not match. Please try again.",
            });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            if ((error.errors && ((_a = error.errors.email) === null || _a === void 0 ? void 0 : _a.kind) === "unique") ||
                (error.errors && ((_b = error.errors.username) === null || _b === void 0 ? void 0 : _b.kind) === "unique")) {
                res.status(400).send({
                    message: "Signup failed. Please check your input and try again.",
                });
            }
            else if (error.errors && ((_c = error.errors.email) === null || _c === void 0 ? void 0 : _c.value)) {
                res.send({
                    message: "Unable to register a new user. Did you enter a valid email?",
                });
            }
            else if (error.errors && error.errors.password) {
                res.status(400).send({
                    message: "Password must contain at least one uppercase and lowercase letter, one number, one special character, and be at least 10 characters long.",
                });
            }
            else if (error instanceof Error) {
                console.log(error.message);
                res.send({
                    message: "Signup failed. Please check your input and try again.",
                });
            }
        }
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingCredentials = req.body;
    const incomingEmail = incomingCredentials.email;
    const incomingPassword = incomingCredentials.password;
    const foundUser = (yield users_1.default.findOne({
        email: incomingEmail,
    }));
    if (!foundUser) {
        return res.status(404).send({
            message: `Login failed, please check your credentials and try again.`,
        });
    }
    const isValidPassword = (0, users_1.validatePassword)(incomingPassword, foundUser.password);
    if (isValidPassword) {
        const token = jsonwebtoken_1.default.sign({ userId: foundUser._id, email: foundUser.email }, process.env.SECRET || "development secret", { expiresIn: "30d" });
        res.send({
            message: `Login successful, welcome back ${foundUser.username}`,
            token,
        });
    }
    else {
        res
            .status(401)
            .send({ message: "Login failed, please review your login credentials." });
    }
});
exports.login = login;
