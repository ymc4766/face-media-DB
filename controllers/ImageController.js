import { asyncHandler } from "../utils/asyncHandler.js";
import CaseModel from "../models/caseModel.js";
import faceapi from "face-api.js";
import fs from "fs";
import path from "path";

// Load face-api.js models
const MODEL_PATH = "./modeie";
await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);

export const ScanFineImage = asyncHandler(async (req, res) => {
  try {
    // Retrieve all images from the CaseModel
    const images = await CaseModel.find({}).select("filename");

    // Load query image
    const queryImage = await faceapi.bufferToImage(
      Buffer.from(req.body.data, "base64")
    );

    // Detect faces and compute face descriptors for the query image
    const queryDetections = await faceapi
      .detectAllFaces(queryImage)
      .withFaceDescriptors();
    const queryFaceDescriptors = queryDetections.map((d) => d.descriptor);

    // Perform face recognition on each image
    const matches = [];
    for (const image of images) {
      // Load the image from the filesystem
      const imagePath = path.join(__dirname, "..", "uploads", image.filename);
      const img = await faceapi.bufferToImage(fs.readFileSync(imagePath));

      // Detect faces and compute face descriptors for the database image
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceDescriptors();
      const faceDescriptors = detections.map((d) => d.descriptor);

      // Create FaceMatcher with face descriptors of database image
      const faceMatcher = new faceapi.FaceMatcher(faceDescriptors);

      // Find best match for each face in the query image
      const bestMatches = queryFaceDescriptors.map((queryDescriptor) =>
        faceMatcher.findBestMatch(queryDescriptor)
      );

      matches.push({ image: image.filename, matches: bestMatches });
    }

    res.status(200).json({ success: true, matches });
  } catch (error) {
    console.error("Error scanning image:", error);
    res.status(500).json({ success: false, error: "Error scanning image" });
  }
});
