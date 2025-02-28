const Role = require("../../model/role.model")
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {  
    let find = {
        deleted : false
    } ;

    const record = await Role.find(find);

    res.render("admin/pages/roles/index",{
        pageTitle : " nhóm quyền" ,
        record : record
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {  

    res.render("admin/pages/roles/create",{
        pageTitle : " Tạo nhóm quyền" ,
    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {  
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {  

   try {
        const id = req.params.id;
    
        
        const data = await Role.findOne({
            _id : id,
            deleted : false
        });

        res.render("admin/pages/roles/edit",{
            pageTitle : " Sửa nhóm quyền" ,
            data: data
        });
   } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
   }
};

// [PATCH] /admin/roles/edt/:id
module.exports.editPatch = async (req, res) => {  
    try {
        await Role.updateOne({
            _id : req.params.id // tìm bản ghi muốn update
        },req.body) // chi tiết bản ghi muốn update
        req.flash("success"," cập nhật thành công sản phẩm !")
    } catch (error) {
        req.flash("error"," cập nhật thất bại !")
    }
    res.redirect("back");
};

// [GET] /admin/roles/permission
module.exports.permission = async (req, res) => {  

    const record = await Role.find({
        deleted : false,
    });

    res.render("admin/pages/roles/permission",{
        pageTitle : " Phân quyền " ,
        record : record
    });
}

// [PATCH] /admin/roles/permission
module.exports.permissionPatch = async (req, res) => {  
    try {
        const permission = JSON.parse(req.body.permission) // phải gọi tới permission
        for (const item of permission) {
            await Role.updateOne({_id : item.id}, {permissions : item.permission});
        };
        req.flash("success","cập nhật phân quyền thành công !");
        res.redirect("back");
    } catch (error) {
        req.flash("error","cập nhật không thành công !");
    }
}