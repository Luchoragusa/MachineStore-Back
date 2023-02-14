const Router = require('express');
const router = Router();
const { policy, checkToken } = require('../../validators/middleware');
const { getOne, getAll, deleteOne, addGame, uploadImage} = require('../../controllers/models/game.controller');
const { updateOne, createOne} = require('../../controllers/generic.controller');
const { Game } = require('../../database/models/index');
const { validateGame } = require('../../validators/input');

// Genericas
router.patch('/:id', checkToken, policy, validateGame,  updateOne(Game)); // actualiza uno

// Especificas
router.post('/', uploadImage, checkToken, policy, validateGame, addGame); // crea uno
router.get('/', getAll); // muestra todos
router.get('/:id', checkToken, getOne); // muestra uno
router.delete('/:id', checkToken, policy, deleteOne); // borra uno

module.exports = router;