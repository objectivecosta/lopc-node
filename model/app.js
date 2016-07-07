"use strict";
var ObjectId = require('mongodb').ObjectID;
var AdminUser = require('./adminUser');

module.exports = global.mongoose.model('App', {
  name: String,
  description: String,
  developmentPushCertificate: Buffer,
  productionPushCertificate: Buffer,
  appClientToken: String,
  appServerToken: String
});

// class App {
//
//   static collectionName() {
//     return "apps";
//   }
//
//   static collection() {
//     return global.database.collection(App.collectionName());
//   }
//
//   constructor(object) {
//     for (var property in object) {
//       this[property] = object[property];
//     }
//   }
//
//   save(callback) {
//     let apps = App.collection();
//     apps.save(this, {w:1}, callback);
//   }
//
//   static appsForQuery(query, serialise, callback) {
//     let apps = App.collection();
//
//     apps.find(query).toArray(function (err, docs) {
//       if (!err) {
//         if (serialise == true) callback(null, _createAppsFromDocs(docs));
//         else callback(null, docs);
//       } else {
//         console.log('Error fetching apps: ' + err);
//         callback(err, null);
//       }
//     });
//   }
//
//   static appsForUsername(username, callback) {
//     var results = [];
//     let adminUsers = AdminUser.collection();
//     adminUsers.aggregate([
//       {
//         $match: {
//           username: username
//         }
//       },
//       {
//         $unwind: "$apps"
//       },
//       {
//         $lookup: {
//           from: App.collectionName(),
//           localField: "apps",
//           foreignField: "_id",
//           as: "appList"
//         }
//       },
//       {
//         $match: { "appList": { $ne: [] } }
//       }
//     ], function (err, entries) {
//       if (err) callback(err, null);
//       else {
//         if (entries.length != 1) {
//           callback('Too many/few users found');
//         } else {
//           var entry = entries[0];
//           delete entry.password;
//           delete entry.apps;
//
//           for (var app of entry.appList) {
//             app.appId = app._id;
//             delete app._id;
//             delete app.description;
//             delete app.developmentPushCertificate;
//             delete app.productionPushCertificate;
//           }
//           callback(null, entry);
//         }
//
//       }
//     });
//   }
// }
//
// function _createAppsFromDocs(docs) {
//   var apps = [];
//   for (var appEntry of docs) {
//     apps.push(new App(appEntry));
//   }
//   return apps;
// }
//
// module.exports = App;
