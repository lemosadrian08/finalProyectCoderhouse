const { Router } = require('express');
const productsRoutes = require('./products/products.routes');
const usersRoutes = require('./users/users.routes');
const cartsRoutes = require('./carts/carts.routes');
const messagesRoutes = require('./messages/messages.routes');
const ordersRoutes = require('./orders/orders.routes');

const router = Router();

// Routes
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/messages', messagesRoutes);
router.use('/orders', ordersRoutes);
router.use('/users', usersRoutes);

module.exports = router;
