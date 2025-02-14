// [GET] /
module.exports  = (req, res) => {       
    res.render("clients/pages/home/index",{
        pageTitle : " trang chủ" 
    });
  }