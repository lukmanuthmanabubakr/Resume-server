import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongo DB Connected");
    });
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "buildit";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variables not set");
    }
    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }
    await mongoose.connect(`${mongodbURI}/${projectName}`)
  } catch (error) {
    console.error("Error connecting to MongDB:", error);
    
  }
};


export default connectDB