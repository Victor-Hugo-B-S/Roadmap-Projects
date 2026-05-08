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
const tasks = JSON.parse(data);

async function saveTasks() {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks), { flag: "w" });
    console.log("Successfully saved");
  } catch (err) {
    throw err;
  }
}

const args = process.argv.slice(2);
const command = args[0] ? args[0] : false;

switch (command) {
  case "add":
    if (argNotExist(1, "Description")) break;
    const description = args[1].trim();

    const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;

    tasks.push({
      id,
      description,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: null,
    });

    await saveTasks();
    console.log("Saved with id: " + id);
    break;

  default:
    console.log(`Command "${command}" does not exist`);
    break;
}

function argNotExist(i, value) {
  if (!args[i]) {
    console.log(`${value} is missing`);
    return true;
  }
  return false;
}
