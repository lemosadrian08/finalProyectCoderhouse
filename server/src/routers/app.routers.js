const { Router } = require('express');
const productsRoutes = require('./products/products.routes');
const usersRoutes = require('./users/users.routes');
const cartsRoutes = require('./carts/carts.routes');

const router = Router();

// Routes
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
