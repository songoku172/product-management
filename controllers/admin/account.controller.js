const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
var md5 = require('md5');
const systemConfig = require("../../config/system");

// [GET] /admin/account
module.exports.index = async (req, res) => {  
    let find = {
        deleted: false,
    } ;
    const record = await Account.find(find).select("-password -token");

    for (const records of record) {
        const role = await Role.findOne({
            _id: records.role_id,
            deleted : false,
        });
        records.role = role;
    }


    res.render("admin/pages/account/index",{
        pageTitle : " Danh sách tài khoản " ,
        record : record
    });
}

// [GET] /admin/account/create
module.exports.create = async (req, res) => { 
    const record = await Role.find({
        deleted : false
    });

    res.render("admin/pages/account/create",{
        pageTitle : "Tạo mới tài khoản " ,
        record : record
    });
};

// [POST] /admin/account/create
module.exports.createPost = async (req, res) => {
    const emaiExist = await Account.findOne({
        email: req.body.email,
        deleted : false
    });
    if(emaiExist){
        req.flash("error", "Email đã tồn tại !");
        res.redirect("back");
    } else {
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };
    
};

// [GET] /admin/account/edit/:id
module.exports.edit = async (req, res) => { 
    try {
        let find = {
            _id: req.params.id,
            deleted: false
        };

        const data = await Account.findOne(find);

        const record = await Role.find({
            deleted : false
        });

        res.render("admin/pages/account/edit",{
            pageTitle : "Tạo mới tài khoản " ,
            data : data,
            record: record
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
};


// [PATCH] /admin/account/edit/:id
module.exports.editPatch = async (req, res) => { 
    const id =  req.params.id;
    console.log(id)
    if(req.body.pasword){
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    };

    await Account.updateOne({_id : id}, req.body );

    req.flash("success" , " cập nhật thành công");
    res.redirect("back");
};



