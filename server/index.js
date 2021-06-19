const newrelic = require('newrelic');
//const db = require('../db/index.js'); // mongo
const db = require('../db/Postgres/index.js') //postgres
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3005;
const cors = require('cors');
const path = require('path');
const redis = require('redis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./public'));

const redisClient = redis.createClient(6379);

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis");
});

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.get('/api/userReviews/:id', (req, res) => {
  try {
    redisClient.get(req.params.id, async(err, data) => {
      if(data) {
        //console.log(data)
        return res.send(JSON.parse(data)).status(200)
      }
      else {
        await db.getUserReview(req.params.id)
        .then((data) => {
          if (!data) {
            res.sendStatus(404);
            console.log('failed')
          } else {
            redisClient.setex(req.params.id, 60, JSON.stringify(data))
            res.send(data).status(200);
          }
        })
        .catch(() => {
          res.sendStatus(404);
        })
      }
    })
  }
  catch(err) {
    console.log(err)
  }
});

app.get('/api/totalReviewScore/:id', (req, res) => {
  try {
    redisClient.get(req.params.id, async(err, data) => {
      if(data) {
        let parsed = JSON.parse(data)
        parsed.stars.courseid = parsed.courseid
        parsed.stars.reviewCount = parsed.reviews.length
        parsed.stars.totalStarScore = (Math.round((parsed.stars.sum / parsed.stars.reviewCount) * 100) / 100).toFixed(1)
        res.send(parsed.stars).status(200);
      }
      else {
        await db.getTotalReviewScore(req.params.id)
        .then((data) => {
          if (!data) {
            res.sendStatus(404);
            console.log('failed')
          } else {
            data.stars.courseNumber = data.courseid
            data.stars.reviewCount = data.reviews.length
            data.stars.totalStarScore = (Math.round((data.stars.sum / data.stars.reviewCount) * 100) / 100).toFixed(1)
            //console.log(data.stars)
            res.send(data.stars).status(200);
          }
        })
        .catch(() => {
          res.sendStatus(404)
        });
      }
    })
  }
  catch(err) {
    console.log(err)
  }
});

// POST
app.put('/api/userReviews/:id', (req, res) => {
  db.postNewReview(req.params.id)
    .then((data) => {
      if (!data) {
        res.sendStatus(404);
      } else {
        res.send(data).status(200);
      }
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

// update
app.put('/api/userReviews/:id', (req, res) => {
  db.updateReview(req.params.id)
    .then((data) => {
      if (!data) {
        res.sendStatus(404);
      } else {
        res.send(req.body).status(200);
      }
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

// delete
app.delete('/api/userReviews/:id', (req, res) => {
  db.deleteReview(req.params.id)
    .then((data) => {
      if (!data) {
        res.sendStatus(404);
      } else {
        res.send(data).status(200);
      }
    })
    .catch(() => {
      res.sendStatus(404);
    });
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


