const express = require('express');
const route = express.Router(); 

const multer  = require('multer');   
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

//validate
const validate = require("../../validates/admin/product-category.validate");

const controller = require("../../controllers/admin/products-category.controller");

route.get('/',controller.index);

route.get('/create',controller.create);

route.post(
    '/create',
    upload.single("thumbnail"),// cần multer // thumbnail là trường lưu ảnh
    uploadCloud.upload,
    validate.createPost,  // không cần truyền (req,res)
    controller.createPost);


module.exports = route  ;