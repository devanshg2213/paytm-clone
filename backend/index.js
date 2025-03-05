import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import connectDb from "./db.js";
connectDb();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use("/api", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
