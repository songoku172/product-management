const User = require("../../model/user.model")
var md5 = require('md5');

// [GET] /user/register
module.exports.register = (req, res) => {       
    res.render("clients/pages/user/register",{
        pageTitle : " Đăng ký tài khoản" 
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {       
   console.log(req.body);
   const existEmail = await User.findOne({
    email : req.body.email
   });
   if(existEmail) {
    req.flash("error","  Email đã tồn tại !");
    res.redirect("back");
    return;
   };
   req.body.password = md5(req.body.password);

   const user = new User(req.body);
   await user.save();

   res.cookie("tokenUser", user.tokenUser);

   res.redirect("/");
}  