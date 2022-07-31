const Router = require('express');
const router = Router();

const {indexU, createU, editU, showU, storeU, destroyU, updateU} = require('../controllers/usuario.controller');
const {indexF, createF, editF, showF, storeF, destroyF, updateF} = require('../controllers/frutas.controller');
const {home} = require('../controllers/home.controller');

// Home

router.get('/', home);

// Usuario

router.get("/usuario", indexU);
router.get("/usuario/create", createU);
router.get("/usuario/show/:id", showU);
router.get("/usuario/edit/:id", editU);

// Usuario API



// Frutas

router.get("/fruta", indexF);
router.get("/fruta/create", createF);
router.get("/fruta/show/:id", showF);
router.get("/fruta/edit/:id", editF);

module.exports = router;