// models/imageModel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  description: {
    type: String,
  },
  // Add any other fields as necessary
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
