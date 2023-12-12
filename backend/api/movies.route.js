import express from 'express';
import MoviesController from './movies.controller.js';


const router = express.Router();
// access express router 

// router.route('/').get((req, res) => {
//     res.send("Hello world from movies.route.js")
// })

router.route('/').get(MoviesController.apiGetMovies);
// now above, each request for '/' will call the api

export default router;