const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
title : String,
description : String,
permissions: {
    type : Array,
    default: []
},
deleteAt : Date
},{
    timestamps: true
});

const Role = mongoose.model('Role',roleSchema,"roles"); // products là tên data lưu trong mongoo

module.exports = Role;