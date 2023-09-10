import mongoose from "mongoose";

let isConnnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
