import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhook } from "./controllers/webhooks.js";

// initialize express
const app = express();

await connectDB();
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});
app.post("/webhooks", clerkWebhook);
// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API IS WORKING`);
});
// export app for testing
