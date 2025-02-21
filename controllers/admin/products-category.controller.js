const ProductsCategory = require("../../model/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filterstatus");
const searchHelpers       = require("../../helpers/search");
const createTreeHelpers   = require("../../helpers/createTree")



//[GET]/admin/products-category
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelpers(req.query);

    let find = {
        deleted : false
         
     };

    const record = await ProductsCategory.find(find);

    const newRecord = createTreeHelpers.tree(record);

    res.render("admin/pages/products-category/index",{
        pageTitle: " Danh mục sản phẩm ",
        record : newRecord,
        filterStatus:filterStatus
    });
};

//[GET]/admin/products-category/creat
module.exports.create = async (req, res) => {
    let find = {
        deleted : false
         
     };


    const record = await ProductsCategory.find(find);

    const newRecord = createTreeHelpers.tree(record);
    // console.log(newRecord)


    res.render("admin/pages/products-category/create",{
        pageTitle: " Tạo danh mục sản phẩm",
        record: newRecord
    });
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    const record = new ProductsCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

//[GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
   try {
        const data = await ProductsCategory.findOne({
            _id : req.params.id,
            deleted : false
        });

        const record = await ProductsCategory.find({
            deleted : false
        });

        const newRecord = createTreeHelpers.tree(record);


        res.render("admin/pages/products-category/edit" ,{
            pageTitle : " Chinh sửa danh mục sản phẩm",
            data : data, 
            record : newRecord
    });
   } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
};

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
        const id =  req.params.id;
        await ProductsCategory.updateOne({_id: id}, req.body);
        res.redirect("back");
};