let router = require('express').Router();

let Pokemon = require('./../models/Pokemon');

router.get('/', function(req, res){
    // objet vide = recup tout les pokemons
    Pokemon.find({}).populate('types').then(pokemons => {
        res.json(pokemons: pokemons);
    });
});

module.exports = router;