const express = require('express');
const router = express.Router();


// Load each controller
const usersController = require('./UserController.js');
const gamesController = require('./GameController.js');
const genresController = require('./GenreController.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/users', usersController);
router.use('/games', gamesController);
router.use('/genres', genresController);
router.use('/application-configuration', appConfigController);


module.exports = router;