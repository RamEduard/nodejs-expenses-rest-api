'use strict';

const process = require('process')

module.exports = {
  development: {
    dialect: "postgres",
    database: "expenses-rest-api-development",
    host: "localhost",
    username: "postgres",
    password: "postgres",
  },
  test: {
    dialect: "postgres",
    database: "expenses-rest-api-test",
    host: "localhost",
    username: "postgres",
    password: "postgres",
  },
  production: {
    dialect: "postgres",
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
};
