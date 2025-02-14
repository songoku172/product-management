const express = require('express');
const route = express.Router(); 
const controller = require("../../controllers/client/home.controller");

route.get('/',controller);

module.exports = route  ;