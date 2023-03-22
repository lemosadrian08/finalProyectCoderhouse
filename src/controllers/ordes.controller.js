const { successResponse, STATUS } = require("../utils/api.utils");
const OrdersApi = require('../api/orders.api');

const api = new OrdersApi();
class OrdersController {
  constructor() {
    // this.api = new OrdersApi();
  }

  async getOrders(req, res, next) {
    try {
      const orders = await api.getOrders();
      const response = successResponse(orders, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    const { id } = req.params;
    try {
      const order = await api.getOrderById(id);
      const response = successResponse(order, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }


  async createOrder(req, res, next) {
    const orderPayload = req.body;
    try {
      const newOrder = await api.createOrder(orderPayload);
      const response = successResponse(newOrder, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    const { id } = req.params;
    const orderPayload = req.body;
    try {
      const updatedOrder = await api.updateOrder(id, orderPayload);
      const response = successResponse(updatedOrder, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    const { id } = req.params;
    try {
      const removedOrder = await api.deleteOrder(id);
      const response = successResponse(removedOrder, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = OrdersController;