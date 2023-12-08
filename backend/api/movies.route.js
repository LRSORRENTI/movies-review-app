import express from 'express';

const router = express.Router();
// access express router 

router.route('/').get((req, res) => {
    res.send("Hello world from movies.route.js")
})

export default router;