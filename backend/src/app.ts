import express from "express";
import cors from "cors";
import areaRoutes from "./routes/area.routes";
import processRoutes from "./routes/process.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/areas", areaRoutes);
app.use("/api/processes", processRoutes);

export default app;
