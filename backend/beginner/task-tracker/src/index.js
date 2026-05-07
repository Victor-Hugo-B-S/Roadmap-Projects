import fs from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "tasks.json");

await fs.mkdir(dataDir, { recursive: true });

try {
  await fs.writeFile(filePath, "[]", { flag: "wx" });
  console.log("Tasks file created");
} catch (err) {
  if (err.code !== "EEXIST") throw err;
}

let data = await fs.readFile(filePath, "utf8");
let tasks = JSON.parse(data);
