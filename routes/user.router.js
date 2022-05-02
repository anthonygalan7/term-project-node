var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/getteam:username', userController.getTeam);
router.post('/setteam', userController.setTeam);

// router.get('/allusers', userController.getAllUsers);
// router.post('/setgoals', userController.setGoals);
// router.get('/getgoals/:username', userController.getGoals);

module.exports = router;
