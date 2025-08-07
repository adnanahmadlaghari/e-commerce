import { User } from "../../prisma/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export {};

