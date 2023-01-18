import IUser from "../models/user";

/* Passport User type */
declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}
