const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const OrdersDTO = require("../../dtos/orders.dto");

class OrdersMongoDAO {
  
  static collection = "orders";
  
  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
    
    .then((connection) => {
        const db = connection.db(database);        
        this._collection = db.collection(OrdersMongoDAO.collection);
      })
  }

  async getOrdersDAO() {
    return await this._collection.find({}).toArray();
  }

  async getOrderByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }

  async getOrdersCountDAO() {
    return await this._collection.countDocuments()
 
  }

  async updateOrderDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }

  async createOrderDAO(orderPayload) {
    const newOrders = new OrdersDTO(orderPayload);
    await this._collection.insertOne(newOrders);
    return newOrders;
  }

  async deleteOrderDAO(id) {
    return await this._collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = OrdersMongoDAO;