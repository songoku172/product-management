const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// connect đến tkhoan cloudinary
cloudinary.config({ 
    cloud_name:"das69ezkd", 
    api_key: "961262811397956", 
    api_secret: "FqWjbBqG5hc8zPsOT95ZSd6Ywnk"
  });
  // end clodinary
  
  
  console.log("API Key:", process.env.CLOUD_NAME);


module.exports.upload =  (req,res,next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result.url); // khi upload file thành công lên cloud thì sẽ trả về 1object trong đó có url của file
            req.body[req.file.fieldname] = result.url;
            next();
        }
        upload(req); // goị hàm
    } else{
        next();
    }

}
