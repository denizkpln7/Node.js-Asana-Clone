const CryptoJS = require("crypto-js");
var JWT = require('jsonwebtoken');

const passwordToHash=(password)=>{
    return  CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
}

const generateAccessToken=(user)=>{
   return JWT.sign({name:user.full_name, ...user}, 'secret',{ expiresIn: 60 * 60 })
}


const generateRefreshToken=(user)=>{
    return JWT.sign( {name:user.full_name,...user}, 'secret')
}


module.exports={
    passwordToHash,
    generateAccessToken,
    generateRefreshToken
}