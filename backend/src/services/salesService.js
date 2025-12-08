import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix dirname + filename for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct JSON path
const jsonPath = path.join(__dirname, "../../dataset.json");

// Load JSON ONCE globally
let data = [];

try {
  const jsonString = fs.readFileSync(jsonPath, "utf8");
  data = JSON.parse(jsonString);
  console.log("Dataset loaded successfully.");
} catch (err) {
  console.error("Error loading JSON:", err);
}

// Service function
export const fetchSalesData = (query) => {
  // Always start by using the loaded dataset
  let result = [...data];

  // If no query, return full dataset
  return result;
};
