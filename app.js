const getToken = require("./utils/auth");

async function test() {
  const token = await getToken();

  console.log(token);
}

test();