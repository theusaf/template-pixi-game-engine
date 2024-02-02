const { spawn } = require("node:child_process");
const path = require("node:path");

spawn("./bin/node", ["./backend/index.js"], {
  stdio: "inherit"
});
