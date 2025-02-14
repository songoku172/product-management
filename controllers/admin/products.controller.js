// [GET] /admin/products
const Products = require("../../model/product.model");
const filterStatusHelpers = require("../../helpers/filterstatus");
const searchHelpers       = require("../../helpers/search");
const paginationHelpers   = require("../../helpers/pagination");
const systemConfig = require("../../config/system");


module.exports.index = async(req, res) => {  

    //console.log(req.query.status);

    const filterStatus = filterStatusHelpers(req.query);

    let find = {
       deleted : false
        
    };

    if(req.query.status){
        find.status = req.query.status;
    };

    const objectSearch = searchHelpers(req.query);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    };
    // Pagination//

    const countProducts = await Products.countDocuments(find); // hàm countdocument là hàm do monggoose hỗ trợ 

    // let objectPagination = paginationHelpers ({
    //     currentPage:1,
    //     limitItem : 4
    // },
    //     req.query,
    //     countProducts
    // );
    let objectPagination = {
        currentPage:1,
        limitItem : 4
    };
    paginationHelpers(objectPagination,req.query,countProducts);
    
    //end Pagination//

    const products = await Products.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    

    res.render("admin/pages/products/index",{
        pageTitle : " trang san pham " ,
        products  : products,
        filterStatus: filterStatus,
        keyWord:objectSearch.keyWord,
        pagination : objectPagination
    });

};

// [GET] /admin/products//change-status/:status/:id

module.exports.changeStatus = async (req,res ) =>{
    const status = req.params.status;
    const id = req.params.id;

    await Products.updateOne({_id:id},{status:status});
    res.redirect("back");
    
};


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) =>{
    const type = req.body.type;
    const ids   = req.body.ids.split(","); // để chuyển id thành mảng
    switch (type) {
        case "active":
            await Products.updateMany({ _id: {$in: ids}}, { status: "active"});
            break;
        case "inactive":    
            await Products.updateMany({ _id: {$in: ids}}, { status: "inactive"});
            break;
        case "delete-all":    
            await Products.updateMany({ _id: {$in: ids}}, {deleted: true, deleteAt: new Date()});
            break;    
        default:
            break;
    }
    res.redirect("back");
};

// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req,res ) =>{
    const id = req.params.id;

    //await Products.deleteOne({_id:id}, {delete: true}); // xóa cứng 
    await Products.updateOne({_id:id},{
        deleted: true,
        deleteAt: new Date()
    });

    res.redirect("back");
    
};

//[GET]/admin/products/creat
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create",{
        pageTitle: " Thêm mới sản phẩm ",
    });
}
//[POST] /admin/products/creat
module.exports.createPost = async (req, res) => {
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    
    const product = new Products(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
  
};

//[GET]/admin/products/edit/:id
module.exports.edit = async (req, res) => {
   try {
    const find = {
        deleted : false, // check xdm sản phẩm đã bọ xóa hay chưa
        _id : req.params.id // lấy ra sản phẩm mà có id như vầy
    };
    const product = await Products.findOne(find);
    //console.log(product); nhưng nó trả ra 1 mảng =>findone
    res.render("admin/pages/products/edit",{
        pageTitle: " Chỉnh sửa sản phẩm ",
        product : product
        
    });
    } catch (error) {
        req.flash("error", " không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
       } 
    
   } 

//[PATCH]/admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    //console.log(req.body);

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.file){  // check nếu có file mới thì thay file luôn
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Products.updateOne({
            _id : req.params.id // tìm bản ghi muốn update
        },req.body) // chi tiết bản ghi muốn update
        req.flash("success"," cập nhật thành công sản phẩm !")
    } catch (error) {
        req.flash("error"," cập nhật thất bại !")
    }
    
   
    res.redirect("back");
    }    

//https://dwatch.com.vn/wp-comtent/uploads/2022/06/Dong-ho-Guess-nam-chinh-hang-1.jpg