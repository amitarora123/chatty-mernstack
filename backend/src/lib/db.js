import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/chat-app`
    );

    if (connectInstance) {
      console.log("mongoDB connected to ", connectInstance.connection.host);
    }
  } catch (error) {
    console.log("failed connecting mongoDB server ", error);
  }
};

export default connectDB;
