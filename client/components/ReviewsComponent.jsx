import './style.css';
import React from 'react';
import Reviews from './Reviews.jsx';
import TotalReviewScore from './TotalReviewScore.jsx';

class ReviewsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseNumber: 1,
      reviews: [],
      totalReviewScore: {}
    };

    this.stars = this.stars.bind(this);
  }

  stars(count) {
    var starHTML = '';
    var partialStar = count - Math.floor(count);
    count = Math.floor(count);
    var i = 0;
    var max = 5;

    var filled = '<span class="_13xsef79 d-inline-block"><svg aria-hidden="true" class="_ufjrdd" style="fill:#F2D049;height:14px;width:14px;margin-right:2px;vertical-align:text-bottom" viewBox="0 0 46 44" role="img" aria-labelledby="FilledStarb719e308-d246-4809-8266-c154e6d4348e FilledStarb719e308-d246-4809-8266-c154e6d4348eDesc" xmlns="http://www.w3.org/2000/svg"><title id="FilledStarb719e308-d246-4809-8266-c154e6d4348e">Filled Star</title><path stroke="#7C6919" stroke-width="3" d="M23 36.5L8.893 43.916l2.694-15.708L.175 17.084l15.772-2.292L23 .5l7.053 14.292 15.772 2.292-11.412 11.124 2.694 15.708z" fill-rule="evenodd" role="presentation"></path></svg></span>';

    var unfilled = '<span class="_13xsef79 d-inline-block"><svg aria-hidden="true" class="_ufjrdd" style="fill:#FFF;height:14px;width:14px;margin-right:2px;vertical-align:text-bottom" viewBox="0 0 46 44" role="img" aria-labelledby="Stara42a4903-db84-4b61-b393-a9494d894b2d Stara42a4903-db84-4b61-b393-a9494d894b2dDesc" xmlns="http://www.w3.org/2000/svg"><title id="Stara42a4903-db84-4b61-b393-a9494d894b2d">Star</title><path d="M23 35.37l-12.779 6.718 2.44-14.229L2.325 17.782l14.287-2.076L23 2.76l6.39 12.946 14.286 2.076-10.338 10.077 2.44 14.23L23 35.37z" stroke="#7C6919" stroke-width="2" fill="#FFF" fill-rule="evenodd" role="presentation"></path></svg></span>';

    var halfStar = '<span class="_13xsef79 d-inline-block"><svg aria-hidden="true" class="_ufjrdd" style="fill:#F2D049;height:14px;width:14px;margin-right:2px;vertical-align:text-bottom" viewBox="0 0 46 44" role="img" aria-labelledby="HalfFilledStara9d8fe4c-b375-42fb-d461-d285fe2c5893 HalfFilledStara9d8fe4c-b375-42fb-d461-d285fe2c5893Desc" xmlns="http://www.w3.org/2000/svg"><title id="HalfFilledStara9d8fe4c-b375-42fb-d461-d285fe2c5893">Half Filled Star</title><path stroke="#7C6919" stroke-width="3" d="M23 0l7.053 14.292 15.772 2.292-11.412 11.124 2.694 15.708L23 36 8.893 43.416l2.694-15.708L.175 16.584l15.772-2.292L23 0zm0 4v29.85L34.743 40 32.5 26.975l9.5-9.224-13.129-1.9L23 4z" role="presentation"></path><polygon fill="#FFF" stroke-width="3" stroke="#7C6919" points="22.8253564 36 22.8253564 2.34479103e-13 29.8787794 14.2917961 45.6507128 16.5835921 34.2380346 27.7082039 36.9322024 43.4164079" role="presentation"></polygon></svg></span>'

    while (i < count) {
      starHTML += filled;
      i++;
    }

    if (partialStar && partialStar > 0.25 && partialStar <= 0.75) {
      starHTML += halfStar;
      count++;
    } else if (partialStar && partialStar > 0.75) {
      starHTML += filled;
      count++;
    }

    while (max > count) {
      starHTML += unfilled;
      max--;
    }

    return starHTML;
  }

  componentDidMount() {

    this._isMounted = true;
    let Id = 1;

    if (window) {
      let urlParts = window.location.href.split('/');
      urlParts[urlParts.length - 1] === '' ? Id = 1 : Id = urlParts[urlParts.length - 1];
    }


    fetch(`http://localhost:3007/api/userReviews/${Id}`)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ reviews: data.reviews });
        }

      })
      .catch(error => console.log(error));

    fetch(`http://localhost:3007/api/totalReviewScore/${Id}`)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ totalReviewScore: data });
        }

      })
      .catch(error => console.log(error));

    fetch(`http://3.140.219.139/api/getTitle/${Id}`)
      .then(response => response.json())
      .then(data => {
        var courseTitle = `TOP REVIEWS FROM ${data.toUpperCase()}`;
        if (this._isMounted) {
          this.setState({
            title: courseTitle
          });
        }
      })
      .catch(err => console.log('Issue with getting course Title', err));

  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="rev-module">
        <h2 className="rev-label">Reviews</h2>
        <div className="comps-container">
          <TotalReviewScore totalReviewScore={this.state.totalReviewScore} stars={this.stars} />
          <div className="reviews-container">
            <div className="course-ti">{this.state.title}</div>
            <Reviews reviews={this.state.reviews} stars={this.stars} />
            <button className="view-all">View all reviews</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewsComponent;