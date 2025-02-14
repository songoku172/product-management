const mongoose = require("mongoose");

var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
title : String,
description : String,
category : String,
price : Number,
discountPercentage : Number,
status : String ,
rating : Number,
stock : Number, 
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
});

const Product = mongoose.model('Product',productSchema,"products"); // products là tên data lưu trong mongoo

module.exports = Product;