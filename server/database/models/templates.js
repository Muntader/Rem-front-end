// person.js
"use strict";

// connect database
var MongoClient = require("mongodb").MongoClient;

var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/";
var assert = require("assert");

module.exports = class templates {
  constructor(name, description, template) {
    this.name = name;
    this.description = description;
    this.temmplate = template;
  }

  insert() {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("rem");
      var myobj = {
        name: this.name,
        description: this.description,
        template: this.template
      };
      dbo.collection("templates").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 template inserted");
        db.close();
      });
    });
  }

  delete(id) {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("rem");
      var myobj = { _id: ObjectId(id) };
      dbo.collection("templates").deleteOne(myobj, function(err, res) {
        if (err) return err;
        console.log("1 server delete");
        db.close();
      });
    });
  }

  async getItem(id) {
    let client, db;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db("rem");
      let dCollection = db.collection("templates");
      let result = await dCollection.find({ _id: ObjectId(id) });
      return result.toArray();
    } catch (err) {
      console.error(err);
    } finally {
      // catch any mongo error here
      client.close();
    }
  }

  async get() {
    let client, db;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db("rem");
      let dCollection = db.collection("templates");
      let result = await dCollection.find();
      return result.toArray();
    } catch (err) {
      console.error(err);
    } finally {
      // catch any mongo error here
      client.close();
    }
  }
};
