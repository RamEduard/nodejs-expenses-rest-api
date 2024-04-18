import jwt from "jsonwebtoken";

import db from "../models/index.js";
import { tokensBlacklist } from "../controllers/auth.controller.js";

export const jwtOptions = {
  secretOrKey: "secret",
};

export const authorizeCallback = async (req, res, next) => {
  const token = (req.headers?.authorization).replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      statusText: 401,
    });
  }

  if (tokensBlacklist.includes(token)) {
    return res.status(403).json({
      message: "User must login",
    });
  }

  const jwtPayload = jwt.verify(token, jwtOptions.secretOrKey);

  try {
    const user = await db.User.findOne({
      attributes: ["id", "email", "fullName"],
      where: { id: jwtPayload.userId },
    });

    if (!user) {
      return res.status(401).json({
        message: "User unauthorized",
        statusText: "Unauthorized",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(`[authorizeCallback] ${err?.meesage}`, err?.stack)

    return res.status(500).json({
      statusText: "Internal Server Error",
    });
  }
};
