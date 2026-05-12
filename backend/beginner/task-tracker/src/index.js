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
let id, description, index;
switch (command) {
  case "add":
    if (argNotExist(1, "Description")) break;
    description = args[1].trim();

    id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;

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

  case "update":
    if (argNotExist(1, "id")) break;
    if (argNotExist(2, "new description")) break;

    id = parseInt(args[1]);
    description = args[2];
    index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      console.log(`Task with id ${id} not found`);
      break;
    }

    tasks[index].description = description;
    tasks[index].updatedAt = Date.now();
    await saveTasks();

    break;

  case "delete":
    if (argNotExist(1, "id")) break;

    id = parseInt(args[1]);
    index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(`Task with id ${id} not found`);
      break;
    }
    tasks.splice(index, 1);
    tasks[index].updatedAt = Date.now();
    await saveTasks();

    break;

  case "mark-in-progress":
    if (argNotExist(1, "id")) break;

    id = parseInt(args[1]);
    index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(`Task with id ${id} not found`);
      break;
    }

    tasks[index].status = "in-progress";
    tasks[index].updatedAt = Date.now();

    await saveTasks();

    break;

  case "mark-done":
    if (argNotExist(1, "id")) break;

    id = parseInt(args[1]);
    index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(`Task with id ${id} not found`);
      break;
    }

    tasks[index].status = "done";
    tasks[index].updatedAt = Date.now();

    await saveTasks();

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
