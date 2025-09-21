import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // role must be teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // role must be student
  },
  { timestamps: true }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
export default Classroom;
