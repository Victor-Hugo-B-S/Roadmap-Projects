# Task Tracker CLI

A simple command-line tool for managing tasks. Add, list, and delete tasks directly from your terminal.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd backend/beginner/task-tracker
```

## Running the CLI

There are three ways to run the Task Tracker CLI:

### Option 1: Using the Full Path

```bash
node ./src/index.js <command> [arguments]
```

This is the simplest approach and works on all systems without any additional configuration.

**Examples:**

```bash
node ./src/index.js add "Buy groceries"
node ./src/index.js list
node ./src/index.js delete 1
```

### Option 2: Using the npm Script (Recommended)

```bash
npm start <command> [arguments]
```

This uses the `start` script defined in `package.json`.

### Option 3: Real CLI with npm link

```bash
npm link
task-tracker <command> [arguments]
```

This installs a global command for your local environment, so you can run `task-tracker` directly.

**Examples:**

```bash
task-tracker add "Buy groceries"
task-tracker list
task-tracker delete 1
```

## Available Commands

### Add a Task

```bash
task-tracker add "Your task description"
```

Creates a new task with the provided description.

### List All Tasks

```bash
task-tracker list
```

Displays all tasks with their IDs, descriptions, and statuses.

### Delete a Task

```bash
task-tracker delete <task-id>
```

Deletes the task with the specified ID.

## Requirements

- Node.js (v14 or higher)

## Data Storage

Tasks are stored in a `tasks.json` file in the `data` directory. This directory is created automatically when you run the CLI for the first time.
