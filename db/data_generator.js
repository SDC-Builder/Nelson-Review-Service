const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writer = csvWriter()

writer.pipe(fs.createWriteStream('./generated.csv'));

const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

var courseNumber = 1;
var reviewCount = Math.floor(Math.random() * (30 - 1) + 1);
var totalStarCount = 0;
var overallStarRating;
var fiveStarCount = 0;
var fourStarCount = 0;
var threeStarCount = 0;
var twoStarCount = 0;
var oneStarCount = 0;

if (reviewCount === 0 || typeof overallStarRating !== 'number') {
  overallStarRating = 1;
}

var reviewsGenerator = (count) => {
  var reviews = [];
  for (var i = 0; i < count; i++) {
    var review = {};
    review.starCount = Math.floor(Math.random() * 5 + 1);
    totalStarCount += review.starCount;

    review.reviewer = faker.name.findName();
    review.reviewDate = faker.date.recent();
    review.reviewText = faker.lorem.paragraph();
    reviews.push(review);
    }
    return reviews;
};

const generate = (id) => (JSON.stringify({
  id,
  weeks: reviewsGenerator(randomNumber(3)),
}));

(async () => {
  console.time('Start');
  for (let id = 1; id <= 1000000; id++) {
    if (id % 500000 === 0) {
      console.log('ID', id);
    }
    writer.write({ record: generate(id) });

    try {
      await new Promise((resolve) => setImmediate(resolve));
    } catch (err) {
      console.log(err);
    }
  }
  writer.end();
  console.timeEnd('Start');
})();