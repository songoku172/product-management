const productRoutes = require("./products.route");
const homeRoute     = require("./home.route");
const userRoute     = require("./user.route");
module.exports = (app) =>{
    app.use('/', homeRoute);

    app.use('/products', productRoutes);

    app.use('/user', userRoute);

       
};