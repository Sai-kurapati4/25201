const axios = require("axios");
require("dotenv").config();

async function getToken() {
  try {
    const res = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: "saiganeshkurapati@gmail.com",
        name: "kurapati sai ganesh",
        rollNo: "25201",
        accessCode: "juFphv",
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    );

    return res.data.access_token;
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

module.exports = getToken;