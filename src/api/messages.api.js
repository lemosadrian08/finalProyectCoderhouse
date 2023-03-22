const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const MessagesSchema = require("../models/schemas/messages.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");



class MessagesApi {
  constructor() {
    this.messagesDAO = getDAOS(envConfig.DATA_SOURCE).messagesDAO;
    this.productsDAO = getDAOS(envConfig.DATA_SOURCE).productsDAO;
  }

  async getMessages() {
      return await this.messagesDAO.getMessagesDAO();
  }
  
  async getMessageById(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const message = await this.messagesDAO.getMessageByIdDAO(id);
    if (!message) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The message does not exist in our records');
    }
    return message;
  }


  async getMessagesByEmail(email) {
    if (!email) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The email param is a required field');
    }
    const message = await this.messagesDAO.getMessagesByEmailDAO(email);
    if (!message) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The message does not exist in our records');
    }
    return message;
  }


  async createMessage(messageBody) {
    if (!messageBody) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The messageBody is a required field');
    }
    const messagePayload = {
      body: messageBody.body,
      email: messageBody.email
    }
    await MessagesSchema.validate(messagePayload);
    return await this.messagesDAO.createMessageDAO(messagePayload);
  }

  async deleteMessage(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const message = await this.messagesDAO.getMessageByIdDAO(id);
    if (!message) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The message does not exist in our records');
    }
    return await this.messagesDAO.deleteMessageDAO(id);
  }

  async updateMessage(id, messagePayload) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    await MessagesSchema.validate(messagePayload);
    return await this.messagesDAO.updateMessageDAO(id, messagePayload);
  }
}

module.exports = MessagesApi;