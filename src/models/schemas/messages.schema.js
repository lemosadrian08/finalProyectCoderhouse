const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class MessagesSchema {
  static #schema = yup.object({
    email: yup.string().email().required(),
    body: yup.string().required(),
    type: yup.string()
  })

  constructor(message) {
    Object.assign(this, message);
  }

  static async validate(messageItem) {
    try {
      return await MessagesSchema.#schema.validate(messageItem);
    }
    catch(error) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'Validation error', error);
    }
   
  }
}

module.exports = MessagesSchema;