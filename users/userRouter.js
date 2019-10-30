const express = require('express');

const router = express.Router();

const userDb = require('./userDb');


router.post('/',  (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'Error adding the user!'
        })
});
})

// router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {

// });

router.get('/', (req, res) => {
    userDb.get(req.body)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error retrieving the users!'})
        })
});

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

// router.get('/:id/posts', validateUserId(), (req, res) => {
    
// });

// router.delete('/:id', validateUserId(), (req, res) => {

// });

// router.put('/:id', validateUserId(), (req, res) => {

// });

//custom middleware

function validateUserId(req, res, next) {
    // console.log(req, res)
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

    if(!req.body){
        res.status(400).json({ message: 'Missing user data'})
    } else if(!req.body.text){
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};

// function validatePost(req, res, next) {

// };

module.exports = router;