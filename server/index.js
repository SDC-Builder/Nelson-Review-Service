const db = require('../db/index.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3007;
const cors = require('cors');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./public'));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.get('/api/userReviews/:id', (req, res) => {
  db.getUserReview(req.params.id)
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

app.get('/api/totalReviewScore/:id', (req, res) => {
  db.getTotalReviewScore(req.params.id)
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

// add
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