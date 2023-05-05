const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/';
const databasename = "GFG"; // Database name 
  
MongoClient.connect(url).then((client) => {
  
    const connect = client.db(databasename);
  
    // New Collection
    const collection = connect
        .createCollection("GFGCollection");
  
    console.log("collection created");
}).catch((err) => {
  
    // Handling the error 
    console.log(err.Message);
})