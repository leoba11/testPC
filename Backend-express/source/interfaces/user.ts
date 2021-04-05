import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
}
