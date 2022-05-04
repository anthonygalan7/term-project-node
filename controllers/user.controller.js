const userService = require('../services/user.service');

module.exports = {
    authenticate,
    register,
    getTeam,
    setPokemon
};

function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {

    userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getTeam(req, res, next) {
    console.log(req.params);
    userService.getTeam(req.params)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function setPokemon(req, res, next) {
    console.log(req.body);
    userService.setPokemon(req.body.team, req.body._id)
        .then(team => res.json(team))
        .catch(err => next(err));
}
