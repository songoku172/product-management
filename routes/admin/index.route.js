const systemConfig = require("../../config/system")

const dashboardRoute  = require("./dashboard.route");
const productsRoute   = require("./products.route");
const productsCategoryRoute   = require("./products-category.route");
const roleRoute    = require("./role.route");
const accountRoute    = require("./account.route");

module.exports = (app) =>{
  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use(PATH_ADMIN + '/dashboard',dashboardRoute );

  app.use(PATH_ADMIN + '/products',productsRoute);

  app.use(PATH_ADMIN + '/products-category',productsCategoryRoute);

  app.use(PATH_ADMIN + '/roles',roleRoute);

  app.use(PATH_ADMIN + '/accounts',accountRoute);
       
  }; 