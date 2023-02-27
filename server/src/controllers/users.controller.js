const { successResponse, STATUS } = require("../utils/api.utils");
const UsersApi = require('../api/users.api');

const api = new UsersApi();
class UsersController {
  constructor() {
    // this.api = new UsersApi();
  }

  async getUsers(req, res, next) {
    try {
      const users = await api.getUsers();
      const response = successResponse(users, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await api.getUserById(id);
      const response = successResponse(user, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    const { email } = req.body;
    try {
      const user = await api.getUserByEmail(email);
      const response = successResponse(user, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    const userPayload = req.body;
    try {
      const newUser = await api.createUser(userPayload);
      const response = successResponse(newUser, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    const { id } = req.params;
    const userPayload = req.body;
    try {
      const updatedUser = await api.updateUser(id, userPayload);
      const response = successResponse(updatedUser, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const removedUser = await api.deleteUser(id);
      const response = successResponse(removedUser, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = UsersController;