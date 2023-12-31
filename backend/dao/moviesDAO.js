import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;


// movies will store the reference to the database
let movies;

// export the class movies data access object which contains 
// a method which is called on server startup and provides 
// database reference to movies
export default class MoviesDAO {
    static async injectDB(conn) {
        // if the reference already exists return
        if(movies) {
            return;
        };
        try {
            // else connect to db and movies collection
            movies = await conn.db(process.env.MOVIESREVIEW_NS).collection('movies')
        }
        catch(e) {
            // log error if we fail to get the reference 
            console.error(`Unable to connect in MoviesDAO: ${e}`)
        };
    };
    static async getMovies({ // default filter
        // the getMovies method accepts a filters method 
        // as a first argument, the default has no filter, 
        // defaults to page 0, and only returns 20 per page

        // also filter results by providing "title" 
        // and "rated" ("PG", "R", etc..)

        filters = null, 
        page = 0,
        moviesPerPage = 20, // default to 20 movies per page
    } = {}){
        let query;
        if(filters) {
            // then with the filters object the query 
            // is constructed:
            if("title" in filters) {
                query = { $text: { $search: filters['title']}}
            } else if("rated" in filters) {
                query = { "rated": { $eq: filters['rated']}}
            }
            // if we use the $text query operator with 
            // $search to search for titles and terms
        }

        // we then find all movies that fit the query and 
        // assign it to cursor

        // cursors are highly configurable and offer several 
        // ways to interact given different  use cases 
        
        let cursor;
        try {

            // we also use skip and limit together, the 
            // skip applies first and the limit only 
            // applies to the documents left after the skip 
            // this allows fot pagination

            cursor = await movies.find(query)
                     .limit(moviesPerPage)
                     .skip(moviesPerPage * page)
        const moviesList = await cursor.toArray();

        // then we get the total number of movies by 
        // counting the number of documents in the 
        // query and return moviesList and totoalNumMovies 
        // in an object
        const totalNumMovies = await movies.countDocuments(query);
        return {moviesList, totalNumMovies}
        }
        catch(e){
            // if an error does occur, we return an empty 
            // movielist and set totalNumMovies to 0
            console.error(`Unable to execute find command: ${e}`);
            return { moviesList: [], totalNumMovies: 0 }
        };
    };

    static async getMoviesById(id) {
        try {
            // we use aggregate to give a sequence of 
            // data aggregation operations, the first operation
            // $match will look up the movie document that matches 
            // that id 
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                } ,
                {
                    // the second operation $lookup will perform 
                    // an equality join using _id from the document 
                    // in movies review collection
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews'
                    }
                }
            ]).next()
        }
        catch(e) {
            console.error(`error in getMoviesById method inside moviesDAO e:${e}`)
            throw e;
        }
    }

    static async getRatings() {
        let ratings = []
        try {
            // we use .dstinct to get all distinct 
            // rated values in the movies collection, then 
            // assign them in the array 
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch(e) {
            console.error(`unable to get ratings in moviesDAO.js getRatings method 
            e: ${e}`)
        }
        return ratings;
    }
};

