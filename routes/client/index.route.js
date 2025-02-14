const productRoutes = require("./product.route");
const homeRoute     = require("./home.route");
module.exports = (app) =>{
    app.use('/', homeRoute);

    app.use('/product', productRoutes);
       
  };