// Rate limiting middleware

// you have given an express server which has a few endpoints.
// your task is to create a global middleware(app.use) which will
// rate limit the request from user to only 5 request per second
// If a user send more than 5 request in a single second the server should block them
// with a 404
// user will be sending in their user id in the header as 'user-id'
// you have given a numberOfReqForUser object to start off with which clears every one second

const express = require("express")
const app = express()

let numberOfReqFromUser = {};
setInterval(() => {
    numberOfReqFromUser = {}
}, 1000)

app.use(function (req, res, next) {
    const userId = req.headers["user-id"]
    if (numberOfReqFromUser[userId]) {
        numberOfReqFromUser[userId] = numberOfReqFromUser[userId] + 1
        if (numberOfReqFromUser[userId] > 5) {
            res.status(404).send("no further entry")
        }
        else {
            next();
        }
    }
    else {
        numberOfReqFromUser[userId] = 1;
    }
})