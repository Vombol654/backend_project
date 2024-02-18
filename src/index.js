require("dotenv").config({ path: `${__dirname}/.env` });
const connect_db = require("./db/index");
connect_db.connectDB();
