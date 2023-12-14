import MoviesDAO from "../dao/moviesDAO.js";
// import movie data access object 

export default class MoviesController {
    // define movies controller class
    static async apiGetMovies(req, res, next){
        // When apiGetMovies is called via a url, 
        // there will be a wuery string in the response
        // where certain query filter parameters might be 
        // specified and passed through in key-value 
        // pairs, as an example a url may look like: 

        // http://localhost:5000/api/v1/movies?title=dragon&moviesPerPage=15&page=0

        // the above url would return an object after the 
        // request is parsed: 
        /* {
            title: "dragon",
            moviesPerPage: "15",
            page: "0"
        } */

            const moviesPerPage = req.query.moviesPerPage ?
            // so above we check if moviesPerPage exists, then 
            // parse it as an integer below, and we do the same 
            // to the const page below as well
            parseInt(req.query.moviesPerPage) : 20
            const page = req.query.page ? parseInt(req.query.page) : 0

            // then we start with an empty filters object, no filters applied 
            // at first 

            let filters = {};
            if(req.query.rated){
                filters.rated = req.query.rated;
            }
            else if(req.query.title){
                filters.title = req.query.title;
            }
            // above we check if rated query and title query 
            // exists, then add it to the filter object 


            // below we call getMovies from the imported data access 
            // obejct 
            const {moviesList, totalNumMovies} = await
            MoviesDAO.getMovies({filters, page, moviesPerPage})

            let response = {
                movies: moviesList,
                page: page,
                filters: filters,
                entries_per_page: moviesPerPage,
                total_results: totalNumMovies
            };
            //finally we send a json response object to the caller of 
            // the url 
            res.json(response);
    };
    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {}
            let movie = await MoviesDAO.apiGetMovieById(id)
            if(!movie) {
                res.status(404).json({error: "movie not found"})
                return 
            }
            res.json(movie)
        }
        catch(e) {
            console.log(`api error in apiGetMoviesById: e: ${e}`)
            res.status(500).json({error: e})
        }
    }
};