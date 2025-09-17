import mongoose from "mongoose";

const MONGO_URI = "mongodb://Samiksha:samu2909@cluster0.mongodb.net/todos?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
