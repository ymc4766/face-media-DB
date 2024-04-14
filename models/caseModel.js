// models/caseModel.js
import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const caseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "under investigation"],
      default: "open",
    },
    assignedOfficer: {
      type: ObjectId,
      ref: "User",
    },
    department: {
      type: String,
      required: true,
    },
    // Add fields for image data
    cctvFootage: {
      type: String,
      // You can adjust the type based on how you plan to store the footage (e.g., file path, URL, base64-encoded data)
    },
    suspectPhotos: [
      {
        type: String,
        // You can adjust the type based on how you plan to store the photos (e.g., file paths, URLs, base64-encoded data)
      },
    ],
    crimeSceneImages: [
      {
        type: String,
        // You can adjust the type based on how you plan to store the images (e.g., file paths, URLs, base64-encoded data)
      },
    ],
    documents: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Case = mongoose.model("Case", caseSchema);

export default Case;
