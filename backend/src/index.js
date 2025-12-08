import express from "express";
import cors from "cors";
import salesRouter from "./routes/salesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/sales", salesRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
