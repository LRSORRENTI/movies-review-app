import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;
// we need tye object id to convert an id string 
// to mongo db object id 

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews){
            return;
        }
        try {
            reviews = await 
            conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        }
        catch(e) {
            console.error(`unable to establish connection in reviewDAO: ${e}`)
        };
    };


    static async addReview(movieId, user, review, date){
        try {
            // create review doc object 
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                // we use the ObjectId method to 
                // turn movie id into a mongo db object id 
                movie_id: ObjectId(movieId)
            };
            return await reviews.insertOne(reviewDoc);
        }
        catch(e) {
            console.error(`unable to post review ${e}`)
            return { error: e };
        };
    };
};

// if reviews isn't filled mongodb will auto create it 