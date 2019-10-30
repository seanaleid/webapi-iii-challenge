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

// setting the routers
// telling the server to use the users router
server.use('/api/:id', logger('Logger for users', usersRouter));

// telling the server to use the posts router
server.use('/api/:id', logger('Logger for posts', postsRouter));


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});




module.exports = server;
