import Case from "../models/caseModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import faceapi from "face-api.js";

// Load face-api.js models
const MODEL_PATH = "./modeie";
await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);

// @desc    Create a new case
// @route   POST /api/cases
// @access  Private
export const createCase = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    department,
    cctvFootage,
    suspectPhotos,
    crimeSceneImages,
  } = req.body;

  try {
    // Preprocess and recognize suspect photos
    const recognizedSuspectPhotos = await recognizeFaces(suspectPhotos);

    // Preprocess and recognize crime scene images
    const recognizedCrimeSceneImages = await recognizeFaces(crimeSceneImages);

    // Create a new case instance with recognized image data
    const newCase = new CaseModel({
      title,
      description,
      department,
      cctvFootage,
      suspectPhotos: recognizedSuspectPhotos,
      crimeSceneImages: recognizedCrimeSceneImages,
      // assignedOfficer: req.user._id, // Assuming authenticated user is assigned to the case
    });

    // Save the case to the database
    await newCase.save();

    res.status(201).json(newCase);
  } catch (error) {
    console.error("Error creating case:", error);
    res.status(500).json({ success: false, error: "Error creating case" });
  }
});

// Function to preprocess and recognize faces in images
const recognizeFaces = async (imageDataArray) => {
  const recognizedImages = [];
  for (const imageData of imageDataArray) {
    // Preprocess image data and detect faces
    const queryImage = await faceapi.bufferToImage(
      Buffer.from(imageData.data, "base64")
    );
    const detections = await faceapi
      .detectAllFaces(queryImage)
      .withFaceDescriptors();

    // Store recognized faces and their descriptors
    recognizedImages.push({ imageData, detections });
  }
  return recognizedImages;
};

// @desc    Get all cases
// @route   GET /api/cases
// @access  Private (Admin only)
export const getAllCases = asyncHandler(async (req, res) => {
  const cases = await Case.find({}).populate("assignedOfficer", "name");

  if (cases) {
    res.status(200).json(cases);
  } else {
    res.status(404);
    throw new Error("No cases found");
  }
});
