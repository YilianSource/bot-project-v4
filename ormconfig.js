/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./src/config.json");
const path = require("path");

module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: config.MYSQL_USER,
    password: config.MYSQL_PASS,
    database: config.MYSQL_DB_NAME,
    entities: [path.resolve("src/database/entities/**/*.ts")],
    migrations: [path.resolve("src/database/migration/**/*.ts")],
    subscribers: [path.resolve("src/database/subscriber/**/*.ts")],
    synchronize: true,
};
