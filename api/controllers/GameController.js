const e = require("express");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const { Game, Genre, User } = db;

// Create custom queries
const createQuery = async (query) => {
	const obj = {
		order: [],
		include: {
			model: Genre,
			through: { attributes: ['genreId'] },
		}
	}

	let order;
	if (query.order) {
		order = [query.order.key, query.order.value];
	} else {
		order = ['name', 'ASC'];
	}
	obj.order.push(order);

	if (query.genre) {
		const genre = { name: query.genre }
		obj['include'][0]['where'] = genre;
	}
	console.log(obj);
	return obj;

}

// Returns a list of all games
router.get("/", async (req, res) => {
	const genre = req.query.genre;
	
	try {

		const obj = await createQuery(req.query);

		const games = await Game.findAll(obj);
		res.status(200).json(games);
	} catch {
		res.status(404).send("Not Found");
	}
});

router.get("/:username", async (req, res) => {
	try {
		const username = req.params.username;
		const games = await Game.findAll({
			limit: 30, 
			order: [["name", "ASC"]],
			include: [{
				model: Genre, 
				through: { attribute: [] },
			}, {
				model: User,
				where: {
					username: username,
				},
				attributes: ['username'], 
				through: { attributes: [] },
				required: false
			}]
		})

		res.status(200).json(games);
	} catch {
		res.status(404).send("Not Found");
	}
})

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

router.get("/details/:game", async (req, res) => {
	try {
		const game = req.params.game;
		console.log(game);
		const result = await Game.findOne({
			where: { name: game },
			include: {
				model: User,
				attributes: ['username'],
				through: {
					attributes: []
				}
			},
		});
		res.status(200).send(result);
	} catch {
		res.status(400).send("Error");
	}
});

router.post("/follow", async (req, res) => {
	try {
		const gameId = req.body.gameId;
		const username = req.body.username;

		const association = await User.findOne({
			where: { username: username }, 
			include: {
				model: Game,
				where: {
					id: gameId
				}
			}
		});

		const game = await Game.findOne({
			where: { id: gameId },
		});
		const user = await User.findOne({
			where: { username: username },
		});

		if (association === null) {
			await user.addGame(game);
		} else {
			await user.removeGame(game);
		}

		res.status(200).json({ message: "Operation Successful" });
	} catch {
		res.status(405).json({ message: "Cannot complete operation" });
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
				return { name: e.name, genres: e.genres.map((e) => e.name) };
			});
			games.forEach(async (e) => {
				await addGames(e.name, e.genres);
			});
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
	const g = await Promise.all(
		genres.forEach(async (e) => {
			const [genre, created] = await Genre.findOrCreate({
				where: { name: e },
			});
			await game.addGenre(genre);
		})
	);

	return game;
};

module.exports = router;
