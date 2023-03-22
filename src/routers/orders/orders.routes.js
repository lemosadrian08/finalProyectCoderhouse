const { Router } = require('express');
const OrdersControllers = require('../../controllers/ordes.controller');

const router = Router();

const ordersController = new OrdersControllers();

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder); 


module.exports = router;
