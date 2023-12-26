// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route for getting comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route for posting comments
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    // Get the comment from the request body
    const { content } = req.body;

    // Get the list of comments for the post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the list
    comments.push({ id: commentId, content });

    // Update the comments object with the new comment list
    commentsByPostId[req.params.id] = comments;

    // Send the new comment back to the user
    res.status(201).send(comments);
});

// Start the web server application
app.listen(4001, () => {
    console.log('Listening on 4001');
});