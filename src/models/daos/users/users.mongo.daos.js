const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const UsersDTO = require("../../dtos/users.dto");

class UsersMongoDAO {
  static collection = "users";

  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
      .then((connection) => {
        const db = connection.db(database);
        this._collection = db.collection(UsersMongoDAO.collection);
      })
  }

  async getUsersDAO() {
    return await this._collection.find({}).toArray();
  }

  async getUserByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }

  async getUserByEmailDAO(email) {
    return await this._collection.findOne({ email: email });
  }


  async createUserDAO(userPayload) {
    const newUsers = new UsersDTO(userPayload);
    await this._collection.insertOne(newUsers);
    return newUsers;
  }
  async deleteUserDAO(id) {
    return await this._collection.deleteOne({ _id: new ObjectId(id) });
  }
  async updateUserDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }
}

module.exports = UsersMongoDAO;