const httpStatus=require("http-status")
var JWT = require('jsonwebtoken');

const autenticateToken=(req,res,next)=>{
 const auhtHeader =  req.headers.authorization

 const token=auhtHeader && auhtHeader.split(" ")[1];
 if(token==null){
    return  res.status(httpStatus.UNAUTHORIZED).send({err:"kullanıcı AUTH HATASıı"})
 }
 
 JWT.verify(token, 'secret', function(err, user) {
     if(err)  res.status(httpStatus.FORBIDDEN).send({err:"kullanıcı AUTH HATAS"})
    req.user=user?._doc;
    next()
  });

}

module.exports=autenticateToken