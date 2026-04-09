const bcrypt = require("bcrypt");

const password = "admin1234";

bcrypt.hash(password, 10).then((hash) => {
  console.log("hash password: ", hash);
});
