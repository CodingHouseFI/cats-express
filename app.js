const PORT = process.env.PORT || 8000;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Cat = require('./models/cat');

const app = express();

// GENERAL MIDDLEWARE

app.set('view engine', 'pug');  // which engine for res.render to use
app.set('views', './views'); // directory where pug files are located

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'))


// ROUTES

app.get('/', (req, res, next) => {

  Cat.getAll(function(err, cats) {

    res.render('index', { title: "My Awesome Page", cats });

  });
});


app.get('/timestamp', (req, res) => {
  res.send({ timestamp: Date.now() });
});


app.route('/cats')
  .get((req, res) => {
    // GET /cats  -  get all cats

    Cat.getAll(function(err, cats) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.send(cats);
      }
    });
  })
  .post((req, res) => {
    // POST /cats  -  create a new cat
    // console.log('req.body:', req.body);
    // res.send(req.body);

    Cat.create(req.body, function(err) {
      if(err) {
        res.status(400).send(err);
      } else {
        res.send();
      }      
    });
  });

app.route('/cats/:id')
  .get((req, res) => {
    // GET /cats/5  -  get one cat
    res.send(`Here is cat #${req.params.id}!`);
  })
  .put((req, res) => {
    // PUT /cats/5  -  update one cat

    let catId = req.params.id;
    let updateObj = req.body;

    Cat.update(catId, updateObj, function(err, newCat) {

      res.status(err ? 400 : 200).send(err || newCat);

    });
  })
  .delete((req, res) => {
    // DELETE /cats/5  -  delete one cat
    let catId = req.params.id;

    Cat.remove(catId, err => {
      res.status(err ? 400 : 200).send(err);
    });

  });


////////////////////////////////////////
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
////////////////////////////////
