const systemConfig = require("../../config/system")

const dashboardRoute  = require("./dashboard.route");
const productsRoute   = require("./products.route");
const productsCategoryRoute   = require("./products-category.route");
const roleRoute    = require("./role.route");
const accountRoute    = require("./account.route");
const authRoute    = require("./auth.route");
const authMiddleware = require("../../middlewares/auth.middleware");

module.exports = (app) =>{
  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use(PATH_ADMIN + '/dashboard',
    authMiddleware.requireAuth,
    dashboardRoute
  );

  app.use(PATH_ADMIN + '/products',authMiddleware.requireAuth,productsRoute);

  app.use(PATH_ADMIN + '/products-category',authMiddleware.requireAuth,productsCategoryRoute);

  app.use(PATH_ADMIN + '/roles',authMiddleware.requireAuth,roleRoute);

  app.use(PATH_ADMIN + '/accounts',authMiddleware.requireAuth,accountRoute);

  app.use(PATH_ADMIN + '/auth',authRoute);
       
  }; 