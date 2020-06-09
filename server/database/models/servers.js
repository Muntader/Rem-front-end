"use strict";

// connect database
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/";
var assert = require("assert");

module.exports = class templates {
  constructor(name, apiKey, ip, cloudDomain, id) {
    this.name = name;
    this.apiKey = apiKey;
    this.domain = ip;
    this.cloudDomain = cloudDomain;
    this.id = id;
  }

  insert() {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("rem");
      var myobj = {
        name: this.name,
        api_key: this.apiKey,
        domain: this.domain,
        cloud_domain: this.cloudDomain
      };
      dbo.collection("servers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 server inserted");
        db.close();
      });
    });
  }

  update() {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("rem");
      var myobj = {
        name: this.name,
        api_key: this.apiKey,
        domain: this.domain,
        cloud_domain: this.cloudDomain
      };
      console.log(myobj);
      dbo
        .collection("servers")
        .updateOne(
          { _id: ObjectId(this.id) },
          { $set: myobj },
          { multi: false },
          function(err, res) {
            if (err) throw err;
            console.log("1 server updated");
            db.close();
          }
        );
    });
  }

  delete(id) {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("rem");
      var myobj = { _id: ObjectId(id) };
      dbo.collection("servers").deleteOne(myobj, function(err, res) {
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
      let dCollection = db.collection("servers");
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
      let dCollection = db.collection("servers");
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
