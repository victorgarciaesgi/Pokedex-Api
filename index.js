const express = require('express'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000;

//mongoose.connect('mongodb://localhost/pokedex');

require('./models/Pokemon');
require('./models/Type');

// instancie server(new app) express
const app = express();

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));



// nouvelle route - qui execute une fonction
// req : requete vers le serveur
// res : response envoyé par le serveur
app.get('/', function(req, res){
    res.send("Pokedex - first page")
});

console.log('Pokedex run ? Yes, on port '+ port);

app.listen(port);