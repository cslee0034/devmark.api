import User from "../models/user";
import IUser from "../models/user";

declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}

declare module "express-server-static-core" {
  interface Request {
    user?: User
  }
}