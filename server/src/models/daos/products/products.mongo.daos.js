const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const ProductsDTO = require("../../dtos/products.dto");

class ProductsMongoDAO {
  static collection = "products";

  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
      .then((connection) => {
        const db = connection.db(database);
        this._collection = db.collection(ProductsMongoDAO.collection);
      })
  }

  async getProductsDAO() {
    return await this._collection.find({}).toArray();
  }

  async getProductByIdDAO(id) {
    return await this._collection.findOne({ _id: new ObjectId(id) });
  }

  async createProductDAO(productPayload) {
    const newProducts = new ProductsDTO(productPayload);
    await this._collection.insertOne(newProducts);
    return newProducts;
  }
}

module.exports = ProductsMongoDAO;