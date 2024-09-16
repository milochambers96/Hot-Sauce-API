import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/users";

export default function secureRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  jwt.verify(
    token,
    "secret sauce", // Make sure this matches the secret used for signing
    async (err, payload) => {
      if (err || !payload) {
        console.error("Error or payload not found:", err);
        return res.status(401).json({ message: "Unauthorized. Invalid JWT." });
      }

      console.log("Valid token! The payload is:", payload);

      interface JWTPayload {
        userId: string;
      }

      const jwtPayload = payload as JWTPayload;
      const userId = jwtPayload.userId;

      const user = await Users.findById(userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found. Invalid JWT!" });
      }

      // Attach user to the request object
      req.currentUser = user;

      next(); // Proceed to the next middleware
    }
  );
}
