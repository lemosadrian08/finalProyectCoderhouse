const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const ProductsSchema = require("../models/schemas/products.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");

class ProductsApi {
  constructor() {
    this.productsDAO = getDAOS(envConfig.DATA_SOURCE).productsDAO;
  }

  async getProducts() {
    return await this.productsDAO.getProductsDAO();
  }

  async getProductById(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const product = await this.productsDAO.getProductByIdDAO(id);
    if (!product) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The product does not exist in our records');
    }
    return product;
  }

  async createProduct(productPayload) {
    await ProductsSchema.validate(productPayload);
    return await this.productsDAO.createProductDAO(productPayload);
  }

  async updateProduct(id, productPayload) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    await ProductsSchema.validate(productPayload);
    return await this.productsDAO.updateProductDAO(id, productPayload);
  }

  async deleteProduct(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    return await this.productsDAO.deleteProductDAO(id);
  }
}

module.exports = ProductsApi;