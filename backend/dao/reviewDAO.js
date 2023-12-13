import mongodb from 'mongodb';

const objectId = mongodb.ObjectId;
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
}

// if reviews isn't filled mongodb will auto create it 