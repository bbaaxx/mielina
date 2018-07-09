const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

module.exports = ({ dbUri }) =>
  new Promise((resolve, reject) => {
    const db = mongoose.connection;
    mongoose.connect(dbUri || MONGO_URI);

    db.on("error", err => reject(err));
    db.once("open", () => {
      console.log("Mongo Database connected");
      resolve(db);
    });
  });
