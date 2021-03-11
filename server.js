const SteamAPI = require('steamapi');
const dotenv = require('dotenv');
const cors = require('cors');
var express = require('express');
const serverless = require('serverless-http');

dotenv.config();
const steam = new SteamAPI(process.env.API_KEY);
let PORT = process.env.PORT || 5000;
let app = express();

app.use(cors());

app.get('/api/get-games', (req, res) => {
  steam
    .resolve(req.query.id.toString())
    .then((id) => {
      steam
        .getUserOwnedGames(id)
        .then((data) => {
          res.json(data);
          console.log(data[0]);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server listening on the port::${PORT}`);
});

module.exports.handler = serverless(app);
