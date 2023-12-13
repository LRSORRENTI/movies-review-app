import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';

const router = express.Router();
// access express router 

// router.route('/').get((req, res) => {
//     res.send("Hello world from movies.route.js")
// })

router.route('/').get(MoviesController.apiGetMovies);
// now above, each request for '/' will call the api

// below we add a route to /review, this will handle 
// all the basic methods for crud operations 

router.route('/review')
      .post(ReviewsController.apiPostReview)
      .put(ReviewsController.apiUpdateReview)
      .delete(ReviewsController.apiDeleteReview)

export default router;