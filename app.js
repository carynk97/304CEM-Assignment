const express = require('express');
const app = express();
const axios = require('axios');
const Games = require('./Games');
const path = require('path'); //---heroku---

const port = process.env.PORT || 5000;

//--- heroku ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//localhost:5000/getgame?title=game-title
app.get('/getgame', (req, res) => {
  const title = req.query.title;
  const querystr = `https://api.rawg.io/api/games/${title}`;

  axios
    .get(querystr)
    .then(response => {
      const games = new Games({
        title: response.data.slug,
        name: response.data.name,
        released: response.data.released,
        updated: response.data.updated,
        background_image: response.data.background_image,
        rating: response.data.rating,
        website: response.data.website
      });
      if (!games.title) {
        res.status(200).json('Not found');
        return;
      }
      games
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallgames
app.get('/getallgames', (req, res) => {
  Games.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//localhost:5000/deletegame?title=game-title
app.get('/deletegame', (req, res) => {
  Games.deleteMany({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
