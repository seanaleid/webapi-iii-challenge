const express = require('express');

// importing helmet and morgan
const helmet = require('helmet');
const morgan = require('morgan');

// logger middleware
const logger = require('./logger-middleware');

// importing users router
const userRouter = require('./users/userRouter');
const postRouter = require("./posts/postRouter");

const server = express();

// global middleware
//custom middleware

// turning on json reading for express
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', logger('Logger for main /'), (req, res) => {
  res.status(200).json({ message: 'test test'});
});

// setting the routers
// telling the server to use the users router
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


module.exports = server;
