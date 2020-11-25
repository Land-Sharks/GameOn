const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { User, Game, Post, UserFollowers } = db;

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
        res.status(201).send("Sign Up Successful");
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

// Retrieves all of the user's posts
router.get('/:username/posts', async (req, res) => {

    const username = req.params.username;

    const result = await Post.findAll({
        where: { username: username },
    })

    res.status(200).json(result);

});

// Retrieves all of the user's following
router.get('/:username/following', async (req, res) => {

    try {
        const username = req.params.username;
    
        const result = await User.findAll({
            where: { username: username },
            attributes: [],
            include: {
                model: User,
                as: 'following',
                attributes: ['username'],
                through: {
                    attributes: []
                }
            }
        })
    
        res.status(200).json(result[0].following);

    } catch(e) {
        res.status(404).json(e);
    }
});

// Retrieves all the followers the user has
router.get('/:username/followers', async (req, res) => {

    try {
        const username = req.params.username;

        const result = await User.findAll({
            attributes: ['username'],
            include: {
                model: User,
                as: 'following',
                attributes: [],
                where: { username: username },
                through: {
                    attributes: []
                }
            }
        })

        res.status(200).json(result);
    } catch(e) {
        res.status(404).json(e);
    }

});

// 
router.post('/follow', async (req, res) => {
    
    try {
        const follower = await User.findOne({
            where: { username: req.body.follower }
        })

        const user = await User.findOne({
            where: { username: req.body.user }
        })

        const result = await user.addFollowing(follower);

        res.status(200).json(result)
    } catch (e){
        res.status(404).json(e);
    }

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