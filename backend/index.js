import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from 'dotenv';

// main function will connect to mongodb and 
// call functions to aceess database

async function main() {
    // first call dotenv.config to load in env vars
    dotenv.config();
    
    console.log("Connecting to MongoDB...");

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    
    // above create an instance using the new keyword and 
    // pass in the database URI

    const port = process.env.PORT || 8000;
    // Also bring in the port from env file, else default 
    // to 8000
    try {

    await client.connect();
    // await further execution until client connects

    console.log("Successfully connected to MongoDB.");

    app.listen(port, () => {
        console.log('server is running on port' + port);
    // app.listen will start the server and listens for requests 
    // to that port
    
        })
    } catch(e) {
        console.error("Error during server startup:", e);
        process.exit(1);
    }
}

main().catch(e => {
    console.error("Unhandled error:", e);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});