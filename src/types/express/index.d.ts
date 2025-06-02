import type { Document, Schema } from "mongoose";
import { IUser } from "../user";

declare global {
  namespace Express {
    interface Request {
      user?:
        & Document<unknown, {}, IUser, {}>
        & IUser
        & Required<{
          _id: Schema.Types.ObjectId;
        }>
        & {
          __v: number;
        };
    }
  }
}


export {}