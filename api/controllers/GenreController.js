const express = require("express");
const router = express.Router();
const db = require("../models");
const { Genre } = db;

// Returns a list of all genres
router.get("/", async (req, res) => {
	try {
		const genres = await Genre.findAll({});
		res.status(200).json(genres);
	} catch {
		res.status(404).send("Not Found");
	}
});

// Adds a genre to the database
router.post("/", async (req, res) => {
	try {
		const genre = await Genre.create(req.body);
		res.status(201).json(genre);
	} catch {
		res.status(400).send("Bad Request");
	}
});

// Deletes a genre from the database
router.delete("/", async (req, res) => {
	try {
		const genre = await Genre.findOne({
			where: { name: req.body.name },
		});
		const result = await genre.destroy();
		res.status(200).json("Delete Successful");
	} catch {
		res.status(400).send("400");
	}
});

module.exports = router;
