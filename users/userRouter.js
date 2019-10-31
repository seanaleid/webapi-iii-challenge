const express = require('express');

const router = express.Router();

const userDb = require('./userDb');
const postDb = require('../posts/postDb');

// 1
router.post('/', validateUser, (req, res) => {
    const newUser = req.body
    
    userDb.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'Error adding the user!'})
        });
})

// 2
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    // const id = req.params.id;
    const post = {...req.body, user_id: req.params.id};

    postDb.insert(post)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({message: 'Error adding the post!'})
        })
});

// 3
router.get('/', (req, res) => {
    userDb.get(req.body)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error retrieving the users!'})
        })
});

// 4
router.get('/:id', validateUserId, (req, res) => {

    userDb.getById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: "Couldn't get user by id."})
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error getting the user"})
        })
});

// 5
router.get('/:id/posts', validateUserId, (req, res) => {
    const {id} = req.params;

    userDb.getUserPosts(id)
        .then(getPosts => {
            res.status(200).json(getPosts)
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve posts"})
        })
});

// 6
router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
            if(count > 0){
                res.status(200).json({ message: 'The user has been removed.'})
            } else {
                res.status(400).json({ message: 'The user could not be found.'})
            }
        })
});

// 7
router.put('/:id', validateUserId, (req, res) => {
    userDb.update(req.params.id, req.body)
        .then(update => {
            if(update){
                res.status(200).json(update);
            } else{
                res.status(404).json(({ message: "The user could not be updated"}));
            }
        })
});




//custom middleware

function validateUserId(req, res, next) {
    // console.log(req)
    const {id} = req.params;

    userDb.getById(id)
    .then(userId => {
        if(userId){
            userId = req.user;
            next();
        } else {
            res.status(400).json({ errorMessage: "Invalid user id." })
        } 
    })
    .catch(err => {
        console.log(res.status(500).json({error: 'there was an error validating the user id'})
    )});
};

function validateUser(req, res, next) {
    const newUser =req.body;
    
    if(!newUser){
        res.status(400).json({ message: 'Missing user data'})
    } else if(!newUser.name){
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    const posts = req.body;

    if(!posts.user_id){
        res.status(400).json({ message: "missing user data" })
    } else if(!posts.text){
        res.status(400).json({ message: "missing required text field" })
    } else {
        next();
    }
};

module.exports = router;