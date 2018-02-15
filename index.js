let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Pokemon = require('./api/models/pokemon'), //created model loading here
    User = require('./api/models/user'), //created model loading here
    bodyParser = require('body-parser');

/** mongoose instance connection url connection **/
mongoose.Promise = global.Promise;

connex = ('mongodb://localhost/pokemondb');

mongoose.connect(connex, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
// start with > mongod

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let routes_pokemon = require('./api/routes/pokemonRoute');
routes_pokemon(app); //register the route for pokemon

let routes_user = require('./api/routes/userRoute');
routes_user(app); //register the route for user

let routes_api = require('./api/routes/apiRoute');
routes_api(app); //register the route for user


app.listen(port);

console.log(`API server started here:\nhttp://localhost:${port}`);