const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const getUserReview = function(id) {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query(`select * from review where courseid = ${id}`, (err, res) => {
        done()
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
          resolve(res.rows[0])
        }
      })
    })
  })
};

const getTotalReviewScore = function (id) {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query(`select * from review where courseid= ${id}`, (err, res) => {
        done()
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
          resolve(res.rows[0])
        }
      })
    })
  })
};

//getUserReview(10000000);

module.exports = {
  getUserReview: getUserReview,
  getTotalReviewScore: getTotalReviewScore,
};