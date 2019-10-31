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
            if(posts){
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: "Couldn't get post by id."})
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error getting the post"})
        })
});

// 3
router.delete('/:id', validatePostId, (req, res) => {
    postDb.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: 'The post has been removed.'})
        } else {
            res.status(400).json({ message: 'The post could not be found.'})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Couldn't delete post"})
    })
});

// 4 
router.put('/:id', validatePostId, (req, res) => {
    postDb.update(req.params.id, req.body)
    .then(update => {
        if(update){
            res.status(200).json(update);
        } else{
            res.status(404).json(({ message: "The post could not be updated"}));
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Couldn't update post"})
    })
});

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