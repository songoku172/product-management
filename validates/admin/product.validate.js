module.exports.createPost = (req, res,next) => {
    //console.log(req.file.filename);
    if(!req.body.title){
        req.flash("error", `Vui lòng nhập tiêu đề `); // giao diện sẽ nhận được key là error: vui lòng ..
        res.redirect("back")
        return;
    };
    next();
}