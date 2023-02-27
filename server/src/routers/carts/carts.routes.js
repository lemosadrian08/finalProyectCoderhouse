const { Router } = require('express');
const CartsControllers = require('../../controllers/carts.controller');

const router = Router();

const cartsController = new CartsControllers();

router.post('/', cartsController.createCart);
router.get('/', cartsController.getCarts);
router.get('/:id', cartsController.getCartById);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart); 
router.get('/:id/products', cartsController.getProductsFromACart);
router.post('/:idc/products/:idp', cartsController.addProductToCart);
router.delete('/:idc/products/:idp', cartsController.deleteAProductFromACart);

module.exports = router;
