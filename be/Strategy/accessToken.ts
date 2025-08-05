import { PrismaClient } from "../prisma/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const {ExtractJwt, Strategy} = require("passport-jwt")
const passport = require("passport")

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET_KEY || "jwtsecret"
}

type JwtPayload = {
  sub: number;
  name: string;
  email: string;
  username: string;
};

passport.use(
  new Strategy(opts, async (jwt_payload: JwtPayload, done:any) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
