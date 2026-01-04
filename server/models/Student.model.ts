import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  languages: string[];
  program: "Web Dev" | "UX/UI" | "Data Analytics" | "Cybersecurity";
  background: string;
  image: string;
  projects: string[]; // Keeping as any[] for flexibility based on current schema
  cohort: mongoose.Types.ObjectId;
}

const studentSchema = new Schema<IStudent>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: [
    {
      type: String,
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },
  ],
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: { type: String, default: "" },
  image: {
    type: String,
    minlength: 1,
    default: "https://i.imgur.com/r8bo8u7.png",
  },
  projects: { type: [String], default: [] }, // Using Mixed for general Array support
  cohort: {
    type: Schema.Types.ObjectId,
    ref: "Cohort",
  },
});

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
