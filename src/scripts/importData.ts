import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import Order from "../models/Order";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env");
}

async function importData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
    const filePath = path.join(
      process.cwd(),
      "src",
      "scripts",
      "data",
      "cleaned.json"
    );

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!data.length) {
      console.log("No data to import");
      return;
    }

    await Order.deleteMany({});

    await Order.insertMany(data);

    console.log(`Imported ${data.length} records`);

    process.exit(0);
  } catch (err) {
    console.error("Import failed:", err);
    process.exit(1);
  }
}

importData();