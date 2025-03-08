const User = require("../../model/user.model");
const Forgotpassword = require("../../model/forgot-password.model");
var md5 = require('md5');
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

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
} ;

// [GET] /user/login
module.exports.login = (req, res) => {       
    res.render("clients/pages/user/login",{
        pageTitle : " Đăng nhập " 
    });
};
// [POST] /user/login
module.exports.loginPost = async (req, res) => {       
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email : email,
        deleted : false
    });
    
    if(!user) {
        req.flash("error", " Email không tồn tại !");
        res.redirect("back");
        return;
    };

    if(md5(password) !== user.password) {
        req.flash("error", " Sai mật khẩu!");
        res.redirect("back");
        return;
    };

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = (req, res) => {       
    res.clearCookie("tokenUser");
    res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {       
    res.render("clients/pages/user/forgot-password",{
        pageTitle : " Lấy lại mật khẩu ",
    });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {       
    const user = await User.findOne({
        email : req.body.email,
        deleted : false
    });

    if(!user) {
        req.flash("error" , " Email không tồn tại !");
        res.redirect("back");
        return ;
    }
    // Lưu thông tin vào DB
    const otp = generateHelper.generateRamdomNumber(8);

    const email = user.email;

    const objectForgotPassword = {
        email :email,
        otp : otp,
        expireAt : Date.now() 
    };

    const forgotPassword = new Forgotpassword(objectForgotPassword);
    await forgotPassword.save();
    // nếu tồn tại email thì gửi mã otp qua email
    const subject= " mã OTP xác minh lấy lại lại mật khẩu "
    
    const html = `MÃ OTP để lấy lại mật khẩu là <b>${otp}</b>`;

    sendMailHelper.sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;     
    res.render("clients/pages/user/otp-password",{
        pageTitle : " Nhập mã OTP ",
        email : email
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async  (req, res) => {      
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await Forgotpassword.findOne({
        email : email,
        otp : otp  
    });
    if(!result) {
        req.flash("error", " OTP không hợp lệ !")
        res.redirect("back");
        return;
    };

    const user = await User.findOne({
        email : email
    });

    res.cookie("tokenUser", user.tokenUser); // khi xác nhận đúng tài khoản thì trả ra roken

    res.redirect("/user/password/reset");

};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {   
    res.render("clients/pages/user/reset-password",{
        pageTitle : " Đổi mật khẩu",
    });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {   
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password != confirmPassword) {
        req.flash("error", " Mật khẩu không khớp !")
        res.redirect("back")
        return;
    };
    await User.updateOne({tokenUser : tokenUser}, {password : md5(password)});

    res.redirect('/');

};

