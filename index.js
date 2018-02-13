let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Pokemon = require('./api/models/pokemon'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pokemondb');
// start with > mongod


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let routes = require('./api/routes/pokemonRoute'); //importing route
routes(app); //register the route

app.listen(port);

console.log(`API server started on: ${port}`);