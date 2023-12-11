
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
};