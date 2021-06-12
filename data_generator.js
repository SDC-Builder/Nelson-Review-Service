const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writer = csvWriter({separator: '\t'})

writer.pipe(fs.createWriteStream('./generated.csv'), delimiter = "\t");

const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

var reviewsGenerator = (count) => {
  var reviews = [];
  for (var i = 0; i < count; i++) {
    var review = {};
    review.reviewer = faker.name.findName();
    review.starCount = randomNumber(5);
    review.reviewDate = faker.date.recent();
    review.reviewText = faker.lorem.paragraph(1);
    reviews.push(review);
  }
  let stars = starGenerator(reviews)
  return reviews;
};

let starGenerator = (reviewsArray) => {
  let starPercentage = {
    'sum': 0,
    'fiveStarPercent': 0,
    'fourStarPercent': 0,
    'threeStarPercent': 0,
    'twoStarPercent': 0,
    'oneStarPercent': 0
  };
  for(let j = 0; j < reviewsArray.length; j++) {
    let current = reviewsArray[j]
      if(current.starCount === 5) {
        starPercentage.fiveStarPercent ++
        starPercentage.sum += 5
      }
      if(current.starCount === 4) {
        starPercentage.fourStarPercent ++
        starPercentage.sum += 4
      }
      if(current.starCount === 3) {
        starPercentage.threeStarPercent ++
        starPercentage.sum += 3
      }
      if(current.starCount === 2) {
        starPercentage.twoStarPercent ++
        starPercentage.sum += 2
      }
      if(current.starCount === 1) {
        starPercentage.oneStarPercent ++
        starPercentage.sum += 1
      }
    }
    starPercentage.fiveStarPercent = (starPercentage.fiveStarPercent/reviewsArray.length * 100).toFixed(2) + '%'
    starPercentage.fourStarPercent = (starPercentage.fourStarPercent/reviewsArray.length * 100).toFixed(2) + '%'
    starPercentage.threeStarPercent = (starPercentage.threeStarPercent/reviewsArray.length * 100).toFixed(2) + '%'
    starPercentage.twoStarPercent = (starPercentage.twoStarPercent/reviewsArray.length * 100).toFixed(2) + '%'
    starPercentage.oneStarPercent = (starPercentage.oneStarPercent/reviewsArray.length * 100).toFixed(2) + '%'

  return starPercentage;
}

(async () => {
  console.time('Start');
  for (let id = 1; id <= 10000000; id++) {
    if (id % 500000 === 0) {
      console.log('ID', id);
    }
    let reviews = reviewsGenerator(randomNumber(3))
    let stars = starGenerator(reviews);
    writer.write({
      courseid: id,
      review: JSON.stringify(reviews),
      stars: JSON.stringify(stars)
    });

    try {
      await new Promise((resolve) => setImmediate(resolve));
    } catch (err) {
      console.log(err);
    }
  }
  writer.end();
  console.timeEnd('Start');
})();