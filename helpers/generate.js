module.exports.generateRamdomString = (length) => {  // length là số ký tự muốn random
    const characters = 
        "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "" ;
    
    for (let i = 0; i<length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}