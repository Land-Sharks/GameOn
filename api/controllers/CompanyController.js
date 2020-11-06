// Company Controller
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Company } = db;

// Return list of all existing companies
router.get("/", async (req, res) => {
	try {
		const companies = await Company.findAll({});
		res.status(200).json(companies);
	} catch {
		res.status(404).send("Not Found");
	}
});

// Adds company to database
router.post("/", async (req, res) => {
	try {
		const company = await Company.create(req.body);
		res.status(201).json(company);
	} catch {
		res.status(400).send("Bad Request");
	}
});

// Deletes company from database
router.delete("/", async (req, res) => {
	try {
		const company = await Company.findOne({
			where: { name: req.body.name },
		});
		const result = await Company.destroy();
		res.status(200).json("Delete Successful");
	} catch {
		res.status(400).send("400");
    }
// Find company from game
});

module.exports = router;
