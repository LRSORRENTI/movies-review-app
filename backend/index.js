import app from "./server";
import mongodb from 'mongodb';
import dotenv from 'dotenv';

// main function will connect to mongodb and 
// call functions to aceess database

async function main() {
    // first call dotenv.config to load in env vars
    dotenv.config();
    
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    // above create an instance using the new keyword and 
    // pass in the database URI

    const port = process.env.PORT || 8000;
    // Also bring in the port from env file, else default 
    // to 8000

    await client.connect();
    // await further execution until client connects

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    // app.listen will start the server and listens for requests 
    // to that port
    
    })
}

main().catch(console.error);
