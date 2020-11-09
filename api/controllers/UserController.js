const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { User } = db;

router.get('/', async (req, res) => {

    const users = await User.findAll({});
    // console.log(users);
    res.status(200).json(users);
    
});

router.post('/', async (req, res) => {

    try {
        console.log(req.body)
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch {
        res.status(400).send("Error");
    }

});

router.post('/login', 
    passport.authenticate('local'), 
    (req, res) => {
        res.json(req.user);
    }
);

router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ messsage: 'Logout successful'});
});

router.post('/clean', (req, res) => {
    
});

module.exports = router;