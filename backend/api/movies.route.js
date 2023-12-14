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

router.route("/id/:id").get(MoviesController.apiGetMoviesById)
// the above route will get a specific movie and all 
// reviews for that movie 

router.route("/ratings").get(MoviesController.apiGetRating)
// the above route will get a list of movie ratings,
// so a user can select ratings

export default router;