import Users, { validatePassword } from "../models/users";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";

export const signup = async (req: Request, res: Response) => {
  try {
    const userProfile = mongoSanitize.sanitize(req.body);
    if (req.body.password === req.body.passwordConfirmation) {
      const newUser = await Users.create(userProfile);
      console.log("The following user profile has been created, ", newUser);
      res.send(newUser);
    } else {
      res.send({
        message:
          "Password and password confirmation did not match. Please try again.",
      });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      if (
        (error.errors && error.errors.email?.kind === "unique") ||
        (error.errors && error.errors.username?.kind === "unique")
      ) {
        res.status(400).send({
          message: "Signup failed. Please check your input and try again.",
        });
      } else if (error.errors && error.errors.email?.value) {
        res.send({
          message:
            "Unable to register a new user. Did you enter a valid email?",
        });
      } else if (error.errors && error.errors.password) {
        res.status(400).send({
          message:
            "Password must contain at least one uppercase and lowercase letter, one number, one special character, and be at least 10 characters long.",
        });
      } else if (error instanceof Error) {
        console.log(error.message);
        res.send({
          message: "Signup failed. Please check your input and try again.",
        });
      }
    }
  }
};

// export const secret = crypto.randomBytes(32).toString("hex");

interface FoundUser {
  password: string;
  email: string;
  _id: string;
  username: string;
}

export const login = async (req: Request, res: Response) => {
  const incomingCredentials = req.body;
  const incomingEmail = incomingCredentials.email;
  const incomingPassword = incomingCredentials.password;
  const foundUser = (await Users.findOne({
    email: incomingEmail,
  })) as FoundUser;
  if (!foundUser) {
    return res.status(404).send({
      message: `Login failed, please check your credentials and try again.`,
    });
  }
  const isValidPassword: boolean = validatePassword(
    incomingPassword,
    foundUser.password
  );
  if (isValidPassword) {
    const token = jwt.sign(
      { userId: foundUser._id, email: foundUser.email },
      "secret sauce",
      { expiresIn: "30d" }
    );
    res.send({
      message: `Login successful, welcome back ${foundUser.username}`,
      token,
    });
  } else {
    res
      .status(401)
      .send({ message: "Login failed, please review your login credentials." });
  }
};
