const { successResponse, STATUS } = require("../utils/api.utils");
const MessagesApi = require('../api/messages.api');

const api = new MessagesApi();
class MessagesController {
  constructor() {
    // this.api = new MessagesApi();
  }

  async getMessages(req, res, next) {
    try {
      const messages = await api.getMessages();
      const response = successResponse(messages, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getMessagesById(req, res, next) {
    const { id } = req.params;
    try {
      const message = await api.getMessagesById(id);
      const response = successResponse(message, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getMessagesByEmail(req, res, next) {
    const  email  = req.params;
    try {
      const message = await api.getMessagesByEmail(email.email);
      const response = successResponse(message, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async createMessage(req, res, next) {
    const messageBody = req.body;
    try {
      const newMessage = await api.createMessage(messageBody);
      const response = successResponse(newMessage, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async updateMessage(req, res, next) {
    const { id } = req.params;
    const messageBody = req.body;
    try {
      const updatedMessage = await api.updateMessage(id, messageBody);
      const response = successResponse(updatedMessage, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteMessage(req, res, next) {
    const { id } = req.params;
    try {
      const removedMessage = await api.deleteMessage(id);
      const response = successResponse(removedMessage, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = MessagesController;