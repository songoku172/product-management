const express = require('express');
const route = express.Router(); 
const multer  = require('multer');
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/account.controller");

route.get('/',controller.index);

route.get('/create',controller.create);

route.post('/create',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.createPost
);

route.get('/edit/:id',controller.edit);

route.patch('/edit/:id',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch
);


module.exports = route  ;