const express = require('express');

var methodOverride = require('method-override');//23

var bodyParser = require('body-parser');


const dataBase = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

var flash = require('express-flash');// thư viện hiển thị thông báo
var cookieParser = require('cookie-parser')
var session = require('express-session')

require('dotenv').config();    // nhúng env vào để dùng

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

const port = process.env.PORT;

app.use(express.static(`${__dirname}/public`)); // để dùng được file tĩnh 
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// hiển thị thông báo
app.use(cookieParser('dfjdabfjbf'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin; // chỉ dùng được trong file pug thôi

dataBase.connect();
route(app);
routeAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})