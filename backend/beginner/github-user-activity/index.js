#!/usr/bin/env node

const user = process.argv[2] ?? "midudev";
console.log("user: ", user);

try {
  const response = await fetch(`https://api.github.com/users/${user}/events`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
} catch (e) {
  console.log("---error: ", e);
}
