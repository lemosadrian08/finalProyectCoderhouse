const { Router } = require('express');
const ProductsControllers = require('../../controllers/products.controller');

const router = Router();

const productsController = new ProductsControllers();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
/* router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct); */

module.exports = router;
