const mongoose = require("mongoose");
const generate = require("../helpers/generate");


const forgotPasswordSchema = new mongoose.Schema({

email : String,
otp : String,
expireAt : {
    type : Date,
    expires : 180 , // đọc docs ở mongoose
},
deleteAt : Date
},{
    timestamps: true
});

const Forgotpassword  = mongoose.model('Forgotpassword',forgotPasswordSchema,"forgot-password"); // products là tên data lưu trong mongoo

module.exports = Forgotpassword ;