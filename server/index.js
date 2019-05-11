const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const repos = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log(req.body.username);
  github.getReposByUsername(req.body.username, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    repos.save(JSON.parse(body), function (err) {
      if (err) console.log(err);
      repos.Repo.find()
        .sort({
          forks: -1
        })
        .limit(25)
        .exec((err, data) => {
          if (err) {
            console.log('I cant get no');
          } else {
          res.send(data);
          }
        });
    });
  });
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  repos.Repo.find()
    .sort({
      forks: -1
    })
    .limit(25)
    .exec((err, data) => {
      if (err) {
        console.log('I cant get no')
      } else {
      res.send(data);
      }
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

