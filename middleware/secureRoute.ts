import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/users";

export default function secureRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res
      .status(401)
      .json({ message: "Unauthorised. No Auth header found." });
  }

  const token = rawToken.replace("Bearer ", "");

  jwt.verify(
    token,
    process.env.SECRET || "development secret",
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

      req.currentUser = user;

      next();
    }
  );
}
