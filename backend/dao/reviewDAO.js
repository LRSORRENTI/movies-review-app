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

    static async updateReview(reviewId, userId, review, date) {
        // when calling update review we specify 
        // the first argument: {user_id: userId, _id: ObjectId(reviewId)}
        // to flter for an existing review created by that user and 
        // with the review id, if it exists we update it with 
        // the second argument
        try {
            const updateResponse = await reviews.updateOne(
                {
                    user_id: userId,
                    _id: ObjectId(reviewId)
                },
                {
                    $set:{review: review, date: date}
                }
            )
             return updateResponse;
        }
        catch(e) {
            console.error(`unable to update review ${e}`)
            return { error: e }
        }
    }
    static async deleteReview(reviewId, userId) {
        // same setup for deleting reviews, we 
        // specify the object id and pass in the 
        // review id, if it exists it gets deleted 
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            })
            return deleteResponse
        }
        catch(e) {
            console.error(`unable to delete review: ${e}`);
            return { error: e }
        };
    }
};

// if reviews isn't filled mongodb will auto create it 