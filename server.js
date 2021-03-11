//const SteamAPI = require('steamapi');
//const dotenv = require('dotenv');
//const cors = require('cors');
//const path = require('path');
var express = require('express');
const serverless = require('serverless-http');

//dotenv.config();
//const steam = new SteamAPI(process.env.API_KEY);
let PORT = process.env.PORT || 5000;
let app = express();
const router = express.Router();

//router.use(cors());

/*router.get('/get-games', (req, res) => {
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
});*/

router.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server listening on the port::${PORT}`);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
