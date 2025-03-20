import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB");
    console.error(err);
    process.exit(1); // Exit the process on connection failure
  }
};

export default dbConnect;
