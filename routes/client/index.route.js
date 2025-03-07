const productRoutes = require("./products.route");
const homeRoute     = require("./home.route");
const userRoute     = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) =>{
    app.use(userMiddleware.inforUser);

    app.use('/', homeRoute);

    app.use('/products', productRoutes);

    app.use('/user', userRoute);

       
};