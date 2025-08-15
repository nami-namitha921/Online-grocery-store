const MongoClient = require('mongodb').MongoClient;

const settings = {
  mongoConfig: {
    serverUrl: "mongodb+srv://naminamitha921:naminamitha921@cluster0.r2qvtew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/",
    database: "db-grocery"
  }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined;

let connectDb = () => {
  if (!_connection) {
    _connection = MongoClient.connect(fullMongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => {
      const db = client.db(settings.mongoConfig.database);
      return db;
    });
  }
  return _connection;
};

module.exports = {
  connectDb
};
