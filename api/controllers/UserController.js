const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { User, Game, Post } = db;

// Returns a list of all users
router.get('/', async (req, res) => {

    const users = await User.findAll({});
    // console.log(users);
    res.status(200).json(users);
    
});

// Creates a new user 
router.post('/', async (req, res) => {

    try {
        console.log(req.body)
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch {
        res.status(400).send("Error");
    }

});

// Authenticates the user
router.post('/login', 
    passport.authenticate('local'), 
    (req, res) => {
        res.json(req.user);
    }
);

// Logs the user out 
router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ messsage: 'Logout successful'});
});

// Returns all the games that a user is following
router.get('/:username/games', async (req, res) => {

    const username = req.params.username;

    const result = await Game.findAll({
        include: {
            model: User,
            where: {
                username: username
            },
            attributes: []
        }
    })
    console.log(username);
    res.status(200).json(result);

});

router.get('/:username/posts', async (req, res) => {

    const username = req.params.username;

    const result = await Post.findAll({
        where: { username: username },
    })

    res.status(200).json(result);

});

router.get('/check', async (req, res) => {
    if (req.user) {
        // console.log(req.user)
        res.status(200).json(req.user)
    } else {
        console.log('Not authenticated');
        res.status(404).json('Not authenticated');
    } 
})

module.exports = router;