import mongoose, { Schema } from "mongoose";
import IReportUser from "../interfaces/reportUser";

const ReportUserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    promotionType: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReportUser>("ReportUser", ReportUserSchema);