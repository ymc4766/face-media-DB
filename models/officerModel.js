// models/officerModel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const officerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  assignedCases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Officer = mongoose.model("Officer", officerSchema);

export default Officer;
