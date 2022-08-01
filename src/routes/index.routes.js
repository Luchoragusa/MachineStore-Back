const Router = require('express');
const router = Router();

const {indexU, createU, editU, showU, storeU, updateU, destroyU} = require('../controllers/usuario.controller');
const {indexF, createF, editF, showF, storeF, updateF, destroyF} = require('../controllers/frutas.controller');
const {home} = require('../controllers/home.controller');

// Home

router.get('/', home);

// Usuario

router.get("/usuario", indexU);
router.get("/usuario/create", createU);
router.get("/usuario/show/:id", showU);
router.get("/usuario/edit/:id", editU);

// Usuario API

router.post("/usuario/store", storeU);
router.patch("/usuario/:id", updateU);
router.delete("/usuario/:id", destroyU);

// Frutas

router.get("/fruta", indexF);
router.get("/fruta/create", createF);
router.get("/fruta/show/:id", showF);
router.get("/fruta/edit/:id", editF);

// Frutas API

router.post("/fruta/store", storeF);
router.patch("/fruta/:id", updateF);
router.delete("/fruta/:id", destroyF);

module.exports = router;