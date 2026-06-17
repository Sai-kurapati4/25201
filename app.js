const log = require("./middleware/logger");

async function test() {
  await log(
    "backend",
    "info",
    "service",
    "application started"
  );

  console.log("log sent");
}

test();