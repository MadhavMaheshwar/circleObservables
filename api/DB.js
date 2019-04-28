// const loadmaster = require('./CircleVizConfig.json').loadmaster
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'jwrvdtki',
  host: 'isilo.db.elephantsql.com',
  database: 'jwrvdtki',
  password: 'RpIcS0VfcH4r4km495G4jfZb1_r2RPw7',
  port: 5432,
})



pool.on('connect', () => {
  console.log('connected to the db');
  // createTables();
});

pool.on('error', (err) => {
  console.error(err)
})

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS shipments_data ( shipment_id SERIAL PRIMARY KEY, source_id VARCHAR(16) NOT NULL, destination_id VARCHAR(16) NOT NULL, date DATE NOT NULL, weight INT NOT NULL, cost INT NOT NULL, new_shipment_id INT NOT NULL, new_weight INT NOT NULL, new_cost INT NOT NULL, total_tls INT NOT NULL )`;

  pool.query(queryText)
    .then((res) => {
      // console.log(res);
      // console.log('Table Created!');
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
}

createTables();

module.exports = pool

