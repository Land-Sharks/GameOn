const e = require("express");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const { Game, Genre } = db;

// Returns a list of all games
router.get("/", async (req, res) => {
	const genre = req.query.genre;
	try {
		const games = genre ? await Game.findAll({
			attributes: ["name"],
			include: {
				model: Genre,
				where: {
					name: genre,
                },
                // Hides the genre name as its redundant
				attributes: [],
				// Hides the associative table GameGenres from results
				through: { attributes: [] },
			},
		})
		: await Game.findAll({
			attributes: ['name'], 
			// include: {
			// 	model: Genre,
			// 	attributes: ['name'],
			// 	through: { attributes: [] },
			// }
		});
		res.status(200).json(games);
	} catch {
		res.status(404).send("Not Found");
	}
});

// Add a game to the database
router.post("/", async (req, res) => {
	try {
		const name = req.body.name;
		const genres = req.body.genre.split(",");
		const game = await addGames(name, genres);
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


router.get("/:game", async (req, res) => {
	try {
		const game = req.params.game;
		console.log(game);
		const result = await Game.findOne({
			where: { name: game },
			include: {
				model: Genre
			}
		})
		res.status(200).send(result);
	} catch {
		res.status(400).send("Error");
	}
});

// Fills your database with a sample of games
router.post("/fill", async (req, res) => {
	const listOfGames = [];
	for (let i = 1; i <= 10; i++) {
		const url = `https://api.rawg.io/api/games?page=${i}`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			const games = await data.results.map((e) => {
				return { name: e.name, genres: e.genres.map(e => e.name) };
			});
			games.forEach(async (e) => {
				await addGames(e.name, e.genres);
			})
			listOfGames.push(games);
		} else {
			console.log(response);
			res.status(404).send("Forbidden");
		}
	}
	res.status(200).send(listOfGames);
});

const addGames = async (name, genres) => {
	const game = await Game.create({
		name: name,
	});
	const g = await Promise.all(genres.forEach(async (e) => {
		const [ genre, created ] = await Genre.findOrCreate({
			where: { name: e }
		});
		await game.addGenre(genre);
	}));
	
	return game;
} 

module.exports = router;
