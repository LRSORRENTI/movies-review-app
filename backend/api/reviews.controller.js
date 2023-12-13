import ReviewsDAO from '..dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {

            // we'll get information from the request 
            // body param, the data needed will be inside 
            // the body of the request 

            // we call an endpoint like: 
            // axios.post("https://localhost:5000/api/v1/movies/review", data)
            
            // and the data object generated will look 
            // something like: 

            // {
            //     review: "excellent film",
            //     name: "Luke",
            //     user_id: "123",
            //     movie_id: "2214a424"
            // }
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json( {status: "success"} )
        } catch (e) {
            res.status(500).json( {error: e.message } )
        }
    }
}