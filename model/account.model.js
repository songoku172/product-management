const mongoose = require("mongoose");
const generate = require("../helpers/generate");


const accountSchema = new mongoose.Schema({
fullName : String,
email : String,
password: String,
token: {
    type : String,
    default : generate.generateRamdomString(20)
},
phone : String,
avatar: String,
role_id: String,
status:String,
deleted :{
    type: Boolean,
    default: false
},
deleteAt : Date
},{
    timestamps: true
});

const Account  = mongoose.model('Account',accountSchema,"account"); // products là tên data lưu trong mongoo

module.exports = Account ;