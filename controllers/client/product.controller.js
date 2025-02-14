const Product = require("../../model/product.model");

//[GET]/product
module.exports.index  = async (req, res) => {      
   const products = await Product.find({});
   console.log(products);

    res.render("clients/pages/products/index",{
      pageTitle : "trang sản phẩm ",
      products : products
    })
  };



