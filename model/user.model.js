const mongoose = require("mongoose");
const generate = require("../helpers/generate");


const userSchema = new mongoose.Schema({
fullName : String,
email : String,
password: String,
tokenUser: {
    type : String,
    default : generate.generateRamdomString(20)
},
phone : String,
avatar: String,
status:String,
deleted :{
    type: Boolean,
    default: false
},
deleteAt : Date
},{
    timestamps: true
});

const User  = mongoose.model('User',userSchema,"user"); // products là tên data lưu trong mongoo

module.exports = User ;