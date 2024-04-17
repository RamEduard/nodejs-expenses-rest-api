import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import db from "../models/index.js";

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

const jwtStrategyInstance = new JwtStrategy(
  jwtOptions,
  async (jwtPayload, done) => {
    try {
      const user = await db.User.findOne({
        attributes: ["id", "email", "fullName"],
        where: { id: jwtPayload.userId },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

export const authorizeCallback = () =>
  passport.authenticate("jwt", { session: false });

passport.use(jwtStrategyInstance);

export default passport;
