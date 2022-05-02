const userService = require('../services/user.service');

module.exports = {
    authenticate,
    register,
    getTeam,
    setTeam
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
    userService.getTeam(req.params)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function setTeam(req, res, next) {
    userService.setTeam(req.body, req.body.username)
        .then(team => res.json(team))
        .catch(err => next(err));
}
