const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.locals.title = 'JerrysGarage'

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  });
});

//get all the items in the garage
app.get('/api/v1/junk', (request, response) => {
  database('junk').select()
    .then((junk) => {
      response.status(200).json(junk);
    })
    .catch(error => {
      console.log('Something is wrong with the database', error);
    })
});

//get a single item
app.get('/api/v1/junk/:id', (request, response) => {
  const { id } = request.params
  database('junk').where('id', id).select()
    .then((item) => {
      response.status(200).json(item);
    })
    .catch(error => {
      console.log('That item does not exist', error);
    })
});

//add a new item
app.post('/api/v1/junk', (request, response) => {
  const { name, reason, cleanliness } = request.body;
  const junk = { name, reason, cleanliness, created_at: new Date }

  database('junk').insert(junk)
    .then(() => {
      database('junk').select()
        .then(junk => {
          response.status(200).json(junk)
        })
        .catch(error => {
          console.log('Cannot post', error);
        })
    })
});

//update an item
app.put('/api/v1/junk/:id', (request, response) => {
  const { id } = request.params;
  const { cleanliness } = request.body;
  if(!cleanliness) { return response.status(422).send('did not pass valid data')}

  database('junk').where('id', id).update({ cleanliness: cleanliness })
  .then(() => {
    database('junk').where('id', id).select()
      .then((item) => {
        response.status(200).json(item);
      })
      .catch(error => {
        console.log('Cannot update item', error);
      })
  });
})

app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running at ${app.get('port')}`)
})

module.exports = app
