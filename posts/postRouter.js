const express = require('express');

const router = express.Router();

const postDb = require('./postDb');

// 1
router.get('/', (req, res) => {

    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There an error!'})
        })
});

// 2
router.get('/:id', validatePostId, (req, res) => {

    postDb.getById(req.params.id)
        .then(posts => {
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

// 3
// router.delete('/:id', (req, res) => {

// });

// 4 
// router.put('/:id', (req, res) => {

// });

// custom middleware

function validatePostId(req, res, next) {

    const {id} = req.params;

    postDb.getById(id)
    .then(postId => {
        if(postId){
            next();
        } else {
            res.status(400).json({ errorMessage: "Invalid user id." })
        } 
    })
    .catch(err => {
        console.log(res.status(500).json({error: 'there was an error validating the user id'})
    )});

};

module.exports = router;