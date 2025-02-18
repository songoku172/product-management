const mongoose = require("mongoose");

var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
title : String,
parent_id: {
    type: String,
    default: ""
},
description : String,
category : String,
status : String ,
thumbnail : String ,
deleted :{
    type: Boolean,
    default: false
},
slug: { 
    type: String, 
    slug: "title",
    unique: true
},
deleteAt : Date
},{
    timestamps: true
}
);

const ProductCategory = mongoose.model('ProductCategory',productSchema,"products-category"); // products là tên data lưu trong mongoo

module.exports = ProductCategory;