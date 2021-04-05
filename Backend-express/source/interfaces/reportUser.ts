import { Document } from "mongoose";

export default interface IReportUser extends Document {
  username: string;
  promotionType: string;
  phoneNumber: string;
  date: Date;
  hour: string;
}
