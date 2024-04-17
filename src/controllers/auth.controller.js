import { jwtOptions } from "../config/passport.js";
import bcrypt from "bcrypt";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const userFound = await db.User.findOne({ where: { email } });

      const passwordMatch = await bcrypt.compare(password, userFound?.password);

      if (!userFound || !passwordMatch) {
        return res.status(401).json({
          statusText: "Unauthorized",
          message: "Bad credentials",
        });
      }

      const jwtToken = jwt.sign(
        { userId: userFound.id },
        jwtOptions.secretOrKey,
        { expiresIn: "1h" }
      );

      const expiresIn1Hour = new Date();
      expiresIn1Hour.setHours(expiresIn1Hour.getHours() + 1);

      return res.json({
        data: {
          expiresIn: expiresIn1Hour.toISOString(),
          jwt: jwtToken,
        },
      });
    } catch (error) {
      console.error(`[AuthController] [login] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error authenticating user",
      });
    }
  }

  static async register(req, res) {
    const { email, fullName, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userRegistered = await db.User.create({
        email,
        fullName,
        password: hashedPassword,
      });

      if (!userRegistered) {
        throw new Error(`User not registered`);
      }

      const jwtToken = jwt.sign(
        { userId: userFound.id },
        jwtOptions.secretOrKey,
        { expiresIn: "1h" }
      );

      const expiresIn1Hour = new Date();
      expiresIn1Hour.setHours(expiresIn1Hour.getHours() + 1);

      return res.status(201).json({
        data: {
          ...userRegistered?.dataValues,
          expiresIn: expiresIn1Hour.toISOString(),
          jwt: jwtToken,
        },
        message: "User registered",
      });
    } catch (error) {
      console.error(
        `[AuthController] [register] ${error?.message}`,
        error?.stack
      );

      res.status(500).json({
        message: "Error registering user",
      });
    }
  }

  static userProfile(req, res) {
    try {
      res.json({
        data: req.user,
      });
    } catch (error) {
      console.error(
        `[AuthController] [userProfile] ${error?.message}`,
        error?.stack
      );

      res.status(500).json({
        message: "Error getting user profile",
      });
    }
  }
}
