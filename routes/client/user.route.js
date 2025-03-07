const express = require('express');
const route = express.Router(); 
const controller = require("../../controllers/client/user.controller.js");


route.get('/register',controller.register);

route.post('/register',controller.registerPost);

route.get('/login',controller.login);

route.post('/login',controller.loginPost);

route.get('/logout',controller.logout);

module.exports = route  ;