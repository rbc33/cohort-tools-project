import mongoose, { Schema, Document } from "mongoose";

export interface ICohort extends Document {
  cohortSlug: string;
  cohortName: string;
  program: "Web Dev" | "UX/UI" | "Data Analytics" | "Cybersecurity";
  format: "Full Time" | "Part Time";
  campus:
    | "Madrid"
    | "Barcelona"
    | "Miami"
    | "Paris"
    | "Berlin"
    | "Amsterdam"
    | "Lisbon"
    | "Remote";
  startDate: Date;
  endDate?: Date;
  inProgress: boolean;
  programManager: string;
  leadTeacher: string;
  totalHours: number;
}

const cohortSchema = new Schema<ICohort>({
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 },
});

const Cohort = mongoose.model<ICohort>("Cohort", cohortSchema);
export default Cohort;
