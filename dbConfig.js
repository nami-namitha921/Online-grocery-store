const { MongoClient } = require('mongodb');

const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "db-grocery"
  }
};

const fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

let _connection = null;

const connectDb = async () => {
  if (_connection) return _connection;
  try {
    const client = await MongoClient.connect(fullMongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _connection = client.db(settings.mongoConfig.database);
    console.log("Connected to MongoDB:", settings.mongoConfig.database);
    return _connection;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

module.exports = { connectDb };
