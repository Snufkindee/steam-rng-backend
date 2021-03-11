const SteamAPI = require('steamapi');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
var express = require('express');

dotenv.config();
const steam = new SteamAPI(process.env.API_KEY);

let port = process.env.PORT || 4000;
let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'my-app/build')));

app.get('/api/get-games', (req, res) => {
  console.log('GET GAMES CALLED!');
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
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
