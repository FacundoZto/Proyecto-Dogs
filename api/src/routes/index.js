const { Router } = require('express');

const dogRoutes = require('./dogRoutes.js');
const temperamentsRoute = require('./temperamentsRoute.js');
const postRoute = require('./postRoute.js');
const orderRoute = require('./orderRoute.js');
const filterRoute = require('./filterRoute.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// UNICOS ENDPOINTS A USAR
// https://api.thedogapi.com/v1/breeds
// https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

router.use('/dogs', dogRoutes);

router.use('/temperament', temperamentsRoute);

router.use('/dog', postRoute);

router.use('/order', orderRoute);

router.use('/filter', filterRoute);

module.exports = router;
