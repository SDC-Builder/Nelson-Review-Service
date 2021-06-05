import React from 'react';
import Review from './Review.jsx';


const Reviews = (props) => {

  let {reviews, stars} = props;

  let reviewList = reviews.map((review) => (
    <Review key={review.reviewer} value={review} stars={props.stars} />
  ));

  return (
    <div>{reviewList.slice(0, 4)}</div>
  );

};

export default Reviews;