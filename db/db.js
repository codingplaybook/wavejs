const mongoose = require('mongoose');
const ATLAS_URI = 'mongodb+srv://captain:hailtothechief@crmdb-actbf.mongodb.net/wave?retryWrites=true&w=majority';
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

/*
const collections = ['comment','follower','following','like','page','post','setting','user','userRole']

connection.db.dropCollection(collections, function(err, result) {console.log(result)});
*/