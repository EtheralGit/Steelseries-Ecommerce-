// import mongoose
import mongoose from "mongoose";

const MongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error Connecting to Mongo Database: ", error);
  }
};

export default MongoConnect;
