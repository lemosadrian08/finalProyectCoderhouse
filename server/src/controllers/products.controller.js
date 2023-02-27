const { successResponse, STATUS } = require("../utils/api.utils");
const ProductsApi = require('../api/products.api');

const api = new ProductsApi();
class ProductsController {
  constructor() {
    // this.api = new ProductsApi();
  }

  async getProducts(req, res, next) {
    try {
      const products = await api.getProducts();
      const response = successResponse(products, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await api.getProductById(id);
      const response = successResponse(product, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    const productPayload = req.body;
    try {
      const newProduct = await api.createProduct(productPayload);
      const response = successResponse(newProduct, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    const productPayload = req.body;
    try {
      const updatedProduct = await api.updateProduct(id, productPayload);
      const response = successResponse(updatedProduct, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const removedProduct = await api.deleteProduct(id);
      const response = successResponse(removedProduct, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = ProductsController;