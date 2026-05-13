#!/usr/bin/env node

const user = process.argv[2] ?? "midudev";
console.log("user: ", user);

function getMessageByType(type, repo, count) {
  switch (type) {
    case "PushEvent":
      return `Pushed to ${repo} ${count} time(s).`;
    case "CreateEvent":
      return `Created something in ${repo} ${count} time(s).`;
    case "DeleteEvent":
      return `Deleted something in ${repo} ${count} time(s).`;
    case "IssuesEvent":
      return `Opened or updated issues in ${repo} ${count} time(s).`;
    case "IssueCommentEvent":
      return `Commented on issues in ${repo} ${count} time(s).`;
    case "PullRequestEvent":
      return `Worked on pull requests in ${repo} ${count} time(s).`;
    case "WatchEvent":
      return `Starred or watched ${repo} ${count} time(s).`;
    default:
      return `Did ${type} in ${repo} ${count} time(s).`;
  }
}

try {
  const response = await fetch(`https://api.github.com/users/${user}/events`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const summary = data.reduce((acc, event) => {
    const repo = event.repo.name;
    const type = event.type;

    if (!acc[repo]) {
      acc[repo] = {};
    }

    acc[repo][type] = (acc[repo][type] ?? 0) + 1;
    return acc;
  }, {});
} catch (e) {
  console.log("---error: ", e);
}
