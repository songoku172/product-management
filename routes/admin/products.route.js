const express = require('express');
const multer  = require('multer'); // upload ảnh
//const storageMulter = require("../../helpers/storageMulter");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const route = express.Router(); 
//validate
const validate = require("../../validates/admin/product-category.validate");

const controller = require("../../controllers/admin/products.controller");

route.get('/',controller.index);

route.patch('/change-status/:status/:id',controller.changeStatus);

route.patch('/change-multi',controller.changeMulti);

route.delete('/delete/:id',controller.deleteItem);

route.get('/create',controller.create);

route.post(
    '/create',
    upload.single("thumbnail"),// cần multer // thumbnail là trường lưu ảnh
    uploadCloud.upload,
    validate.createPost,  // không cần truyền (req,res)
    controller.createPost);

route.get('/edit/:id',controller.edit);

route.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    validate.createPost,  // không cần truyền (req,res)
    controller.editPatch
);

route.get('/detail/:id',controller.detail);



module.exports = route  ;
