const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const MessagessDTO = require("../../dtos/messages.dto");

class MessagessMongoDAO {
  static collection = "messages";

  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
      .then((connection) => {
        const db = connection.db(database);
        this._collection = db.collection(MessagessMongoDAO.collection);
      })
  }

  async getMessagesDAO() {
    return await this._collection.find({}).toArray();
  }

  async getMessageByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }


  async getMessagesByEmailDAO(email) {
    return await this._collection.find({ email }).toArray();
}

  async createMessageDAO(messagePayload) {
    const newMessagess = new MessagessDTO(messagePayload);
    await this._collection.insertOne(newMessagess);
    return newMessagess;
  }

  async updateMessageDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }

  async deleteMessageDAO(id) {
    return await this._collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = MessagessMongoDAO;






/* const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const MessagesDTO = require("../../dtos/messages.dto");

class MessagesMongoDAO {
  
  static collection = "messages";
  
  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
    
    .then((connection) => {
        const db = connection.db(database);        
        this._collection = db.collection(MessagesMongoDAO.collection);
      })
  }

  async getMessagesDAO() {
    return await this._collection.find({}).toArray();
  }

  async getMessageByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }

  
  async updateMessageDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }

  async createMessageDAO(messagePayload) {
    const newMessages = new MessagesDTO(messagePayload);
    await this._collection.insertOne(newMessages);
    return newMessages;
  }

  async deleteMessageDAO(id) {
    return await this._collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = MessagesMongoDAO; */