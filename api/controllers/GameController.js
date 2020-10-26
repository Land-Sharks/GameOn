const express = require("express");
const router = express.Router();
const db = require("../models");
const { Game, Genre } = db;

// Returns a list of all games
router.get("/", async (req, res) => {
	try {
		const games = await Game.findAll();
		res.status(200).json(games);
	} catch {
		res.status(404).send("Not Found");
	}
});

// Add a game to the database
router.post("/", async (req, res) => {
	try {
		const game = await Game.build({
			name: req.body.name,
		});
		const genre = await Genre.findOne({
			where: { name: req.body.genre },
		});
		await game.save();
		await game.addGenres(genre);
		res.status(201).send(game);
	} catch {
		res.status(400).send("Error");
	}
});

// Deletes a game from the database
router.delete("/", async (req, res) => {
	try {
		const game = await Game.findOne({
			where: { name: req.body.name },
		});
		const result = await game.destroy();
		res.status(200).send(result);
	} catch {
		res.status(400).send("Error");
	}
});

// Returns a list of games that are a certain genre
router.get("/genre/:name", async (req, res) => {
	const name = req.params.name;

	try {
		const games = await Game.findAll({
			attributes: ["name"],
			include: {
				model: Genre,
				where: {
					name: name,
                },
                // Hides the genre name as its redundant
				attributes: [],
				// Hides the associative table GameGenres from results
				through: { attributes: [] },
			},
		});
		res.status(200).json(games);
	} catch {
		res.status(404).send("Not Found");
	}
});

module.exports = router;
