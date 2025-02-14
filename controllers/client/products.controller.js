const Product = require("../../model/product.model");

//[GET]/product
module.exports.index  = async (req, res) => {      
   const products = await Product.find({
    status: "active",
    deleted: false
   });

   const newProducts = products.map((item) =>{
    item.priceNew = (
      (item.price * (100- item.discountPercentage))/ 100
    ).toFixed(0);
    return item;
   })
   //console.log(products);

    res.render("clients/pages/products/index",{
      pageTitle : "trang sản phẩm ",
      products : newProducts
    })
  };

//[GET]/detail/:slug
module.exports.detail = async (req, res) => {      
    try {
     const find = {
         deleted : false, 
         _id : req.params.id,
         status:"active"
     };
     const product = await Product.findOne(find);

     res.render("clients/pages/products/detail",{
         pageTitle: product.title,
         product : product
         
     });
     } catch (error) {
         res.redirect(`/products`);
        } 
     
}     




