import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;

