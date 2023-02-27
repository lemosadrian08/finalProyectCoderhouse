const { successResponse, STATUS } = require("../utils/api.utils");
const CartsApi = require('../api/carts.api');

const api = new CartsApi();
class CartsController {
  constructor() {
    // this.api = new CartsApi();
  }

  async getCarts(req, res, next) {
    try {
      const carts = await api.getCarts();
      const response = successResponse(carts, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await api.getCartById(id);
      const response = successResponse(cart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getProductsFromACart(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await api.getProductsFromACart(id);
      const response = successResponse(cart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next) {
    const { idc , idp } = req.params;
    const quantity = req.body;
    try {
      const cart = await api.addProductToCart(idc, idp, quantity);
      const response = successResponse(cart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteAProductFromACart(req, res, next) {
    const { idc , idp } = req.params;
    try {
      const cart = await api.deleteAProductFromACart(idc, idp);
      const response = successResponse(cart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async createCart(req, res, next) {
    const cartPayload = req.body;
    try {
      const newCart = await api.createCart(cartPayload);
      const response = successResponse(newCart, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    const { id } = req.params;
    const cartPayload = req.body;
    try {
      const updatedCart = await api.updateCart(id, cartPayload);
      const response = successResponse(updatedCart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params;
    try {
      const removedCart = await api.deleteCart(id);
      const response = successResponse(removedCart, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = CartsController;