const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;

router.get('/', async (req, res) => {

    const users = await User.findAll({});
    // console.log(users);
    res.status(200).json(users);
    
});

router.post('/', async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch {
        res.status(400).send("Error");
    }

});

module.exports = router;