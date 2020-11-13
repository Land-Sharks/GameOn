const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { User, Game } = db;

// Returns a list of all users
router.get('/', async (req, res) => {

    const users = await User.findAll({
        include: {
            model: Game
        }
    });
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

module.exports = router;