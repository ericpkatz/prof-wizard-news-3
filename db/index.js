const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL, 'postgres://localhost/wnews');
const fs = require('fs');
const path = require('path');

const syncAndSeed = async()=> {
  const sql = fs.readFileSync(path.join(__dirname, '../seed.sql')).toString();
  await client.query(sql);

};

module.exports = {
  client,
  syncAndSeed
};
