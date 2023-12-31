import ReviewsDAO from '../dao/reviewDAO.js'

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
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json( {status: "success"} )
        } catch (e) {
            res.status(500).json( {error: e.message } )
        };
    };

    // add apiUpdayeReview method: 

    static async apiUpdateReview(req, res, next) {
        // like the post review method, this method will 
        // also be called by the frontend 
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;

            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )

            let { error } = reviewResponse;
            if(error) {
                res.status.json( {error} )
            };
            if(reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review")
            };
            res.json( {status: "success"} )
        }
            catch(e) {
                res.status(500).json( {error: e.message} )
            };
    };
        static async apiDeleteReview(req, res, next) {
            // just like the other methods we extract 
            // the id's and data needed to delete 
            try {
                const reviewId = req.body.review_id;
                const userId = req.body.user_id;
                const reviewResponse = await ReviewsDAO.deleteReview(
                    reviewId, 
                    userId
                )

                res.json( {status: "success"} )
            } catch (e) {
                res.status(500).json( {error: e.message} )
            }
        }
};