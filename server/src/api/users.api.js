const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const UsersSchema = require("../models/schemas/users.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");

class UsersApi {
  constructor() {
    this.usersDAO = getDAOS(envConfig.DATA_SOURCE).usersDAO;
  }

  async getUsers() {
    return await this.usersDAO.getUsersDAO();
  }

  async getUserById(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const user = await this.usersDAO.getUserByIdDAO(id);
    if (!user) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The user does not exist in our records');
    }
    return user;
  }

  async getUserByEmail(email) {
    if (!email) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The email param is a required field');
    }
    const user = await this.usersDAO.getUserByEmailDAO(email);
    if (!user) {
      return null
    }
    return user;
  }

  async createUser(userPayload) {
    await UsersSchema.validate(userPayload);
    return await this.usersDAO.createUserDAO(userPayload);
  }

/*   async updateUser(id, userPayload) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    await UsersSchema.validate(userPayload);
    return await this.usersDAO.updateUserDAO(id, userPayload);
  }

  async deleteUser(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    return await this.usersDAO.deleteUserDAO(id);
  } */
}

module.exports = UsersApi;