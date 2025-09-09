import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const router = express.Router();

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes folder ka path
const routesPath = path.join(__dirname);

fs.readdirSync(routesPath).forEach((file) => {
  if (file !== "index.js" && file.endsWith(".js")) {
    const filePath = path.join(routesPath, file);

    // Fix: absolute path ko file:// URL me convert karo
    import(pathToFileURL(filePath)).then((module) => {
      const routeName = file.replace("Routes.js", "").toLowerCase();
      router.use(`/${routeName}`, module.default);
    });
  }
});

export default router;
