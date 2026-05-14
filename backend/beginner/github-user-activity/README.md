# GitHub User Activity CLI

A simple command-line tool that fetches a GitHub user's recent activity and prints a summary in the terminal.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd backend/beginner/github-user-activity
```

## Running the CLI

There are three ways to run the GitHub User Activity CLI:

### Option 1: Using the Full Path

```bash
node ./index.js <github-username>
```

This is the simplest approach and works on all systems without any additional configuration.

**Example:**

```bash
node ./index.js midudev
```

If you do not provide a username, the script uses `midudev` by default.

### Option 2: Using the npm bin Command with npm link

```bash
npm link
github-user-activity <github-username>
```

This installs a global command for your local environment, so you can run `github-user-activity` directly.

**Examples:**

```bash
github-user-activity midudev
github-user-activity torvalds
```

## What It Does

The CLI:

- fetches the latest public events from the GitHub API
- groups activity by repository and event type
- prints a custom message for each event type

## Available Event Messages

The script currently handles these event types:

- `PushEvent`
- `CreateEvent`
- `DeleteEvent`
- `IssuesEvent`
- `IssueCommentEvent`
- `PullRequestEvent`
- `WatchEvent`

Any other event type is shown with a default message.

## Requirements

- Node.js 18 or higher

## Notes

- The GitHub API only returns a limited number of recent public events.
- If the request fails, the script prints the error in the terminal.
