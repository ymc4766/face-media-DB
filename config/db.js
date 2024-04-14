import mongoose from "mongoose";

export const db = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `db connected succesfully : ${connect.connection.host}`.yellow.inverse
    );
  } catch (error) {
    console.log("db failed to Connect :", error.message);
    process.exit(1);
  }
};
