const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const CartsDTO = require("../../dtos/carts.dto");

class CartsMongoDAO {
  
  static collection = "carts";
  
  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
    
    .then((connection) => {
        const db = connection.db(database);        
        this._collection = db.collection(CartsMongoDAO.collection);
      })
  }

  async getCartsDAO() {
    return await this._collection.find({}).toArray();
  }

  async getCartByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }


  async getProductsFromACartDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) },
    { projection: { _id:0 , products: 1 } })
  }
  

  async updateCartDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }

  async pushProductInCartDAO(id, item){
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { products: item } }
    )
  }

  async createCartDAO(cartPayload) {
    const newCarts = new CartsDTO(cartPayload);
    await this._collection.insertOne(newCarts);
    return newCarts;
  }
}

module.exports = CartsMongoDAO;