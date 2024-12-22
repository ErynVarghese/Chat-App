import mongoose from "mongoose";


const connect = async () => {
  try {
    console.log("Attempting to connect to MongoDb database.");
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to database!");
  } catch (error) {
    console.log("Failed to connect to MongoDb database!", error.message);
    process.exit(1);
  }
};

export default connect;