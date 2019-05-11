const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },
  full_name: String,
  owner: {
    login: String
  },
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.insertMany(data, function (err) {
    if (err){
      console.log('Unable to Mongo');
    }
    callback(err);
  });
};

module.exports = { Repo, save };