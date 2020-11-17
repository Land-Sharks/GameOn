const express = require("express");
const router = express.Router();
const db = require("../models");
const { Post, User } = db;

//However, this does not return any of the posts! It always goes to the catch block instead
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                where: {
                    
                }
            },
        });
        console.log(posts)
		res.status(200).json(posts);
	} catch {
		res.status(404).send({message: "no posts found"});
	}
})

//This works just fine!
router.post("/", async (req, res) => {
    console.log("Request body: " + req.body)
   // res.send({mess: "Body received!"})
    try {
        const post = await Post.create(req.body);
        const user = await User.findOne({where: {username: req.body.username}})
        await user.addPost(post)
		res.status(200).json(post);
	} catch {
		res.status(400).send({message: "bad request!"}); 
	}
})

router.get("/:id", (req, res) => {
    
})

module.exports = router;