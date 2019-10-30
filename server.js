const express = require('express');

// logger middleware
const logger = require('./logger-middleware');

// importing users router
const usersRouter = require('./users/userRouter');

// importing posts router
const postsRouter = require('./posts/postRouter');

const server = express();



// global middleware
//custom middleware

// turning on json reading for express
server.use(express.json());

// setting the routers
// telling the server to use the users router
server.use('/api/users', usersRouter);

// telling the server to use the posts router
server.use('/api/posts', postsRouter);


server.get('/', logger('Logger for main /'), (req, res) => {
  res.status(200).json({ message: 'test test'});
  res.send(`<h2>Let's write some middleware!</h2>`)
});




module.exports = server;
