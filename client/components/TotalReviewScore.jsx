import React from 'react';
import RatingGraph from './RatingGraph.jsx';

const TotalReviewScore = (props) => {

  return (
    <div>
      <div>
        <div className="reviews-overview">
          <div className="total-review-score">{props.totalReviewScore.totalStarScore}</div>
          <div>
            <div className="stars" dangerouslySetInnerHTML={{ __html: props. stars(props.totalReviewScore.totalStarScore) }} />
            <div className="" >{props.totalReviewScore.reviewCount}  reviews</div>
          </div>
        </div>
      </div>
      <RatingGraph totalStars={props.totalReviewScore} />
    </div>
  );
};

export default TotalReviewScore;