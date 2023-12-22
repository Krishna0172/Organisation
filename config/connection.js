const { Client } = require('pg');
const client = new Client({
  host: "c.fspostgresprod.postgres.database.azure.com",
  user: "powerbipostgresreadonly",
  port: "5432",
  password: "fsdbpwbi#sha@641011",
  database: "citus",
  ssl: { rejectUnauthorized: false }
});

console.log("Connection created....");
module.exports = client;
