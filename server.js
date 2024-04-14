// server.js
import express from "express";
import colors from "colors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Law Enforcement System API");
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// MongoDB Connection
db();

// Routes

app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
