#!/usr/bin/env node

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
