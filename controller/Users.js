const {insert,list,loginUser,modify,updateUser} =require("../services/Users")
const nodemailer = require("nodemailer");
const ProjectServices =require("../services/Projects")
const httpStatus=require("http-status")
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../utils/helper")
const uuid=require('uuid');
const eventEmitter = require("../scripts/events/eventEmitter");
const path=require("path")

const create=(req,res,next)=>{
   const data=req.body
 
   data.password=passwordToHash(data.password)
    insert(data).then((response)=>{
         res.status(httpStatus.CREATED).send(response)
    }).catch((err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
    
}

const login=(req,res,next)=>{
   const password=passwordToHash(req.body.password)
    loginUser(req.body).then((user)=>{
        if(!user)  return  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({err:"kullanıcı bulunamadı"})
       
       user={
        ...user.toObject(),
        tokens:{
            access_token:generateAccessToken(user),
            refresh_token:generateRefreshToken(user), 
        }
       }
        
        res.status(httpStatus.OK).send(user)
     }).catch((err)=>{
       res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const index=(req,res,next)=>{
    list().then((response)=>{
        res.status(httpStatus.OK).send(response)
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST)
    })   
  
}

const projectList=(req,res)=>{
    ProjectServices.list(req.user?._id)
    .then((response)=>{
        res.status(httpStatus.OK).send(response)
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST)
    })   
}

const resetPassword=(req,res)=>{

 eventEmitter.emit("send_email","bu dabenim dtam")

  const newpassword=uuid.v4()?.split("-")[0] || new Date().getTime()
  modify({email:req.body.email},{password:passwordToHash(newpassword)}).then((response)=>{
    if(!response) return  res.status(httpStatus.BAD_REQUEST).send({message:"böyle bir kullanıcı"})
    // eventEmitter.emit("send_email",{
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Şifre sıfırlama ✔", // Subject line
    //     html: `Talebiniz üzeriniz şifre sınırlandı Şifreniz <b>${newpassword}</b>`, 
    //   })
    res.status(httpStatus.OK).send(response)
}).catch((err)=>{
    res.status(httpStatus.BAD_REQUEST)
})   
}

const update=(req,res)=>{
   
    const data=req.body
    updateUser({_id:req.user?._id},data)
    .then((response)=>{
        res.status(httpStatus.OK).send(response)
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST).send({message:"yenilenemdi"})
    })   
}

const updateProfileImage =(req,res)=>{

    //const fileName=req?.user._id
    if(!req?.files?.profile_image){
        return  res.status(httpStatus.BAD_REQUEST).send({message:"bu işlemi yapılmadı"})
    }
    const extension=path.extname(req.files.profile_image.name)
    const fileName=`${req?.user._id}${extension}`
    const folderPath=path.join(__dirname,"../","uploads/users",fileName)
    req.files.profile_image.mv(folderPath,function (err) {
     if(err){
        return  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:"bu işlemi yapılmadı"})
     }
     modify({_id:req.user._id},{profile_image:fileName})
     .then((response)=>{
        res.status(httpStatus.OK).send(response)
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST).send({message:"yenilenemdi"})
    })   
    })
}


module.exports={
    create,
    index,
    login,
    projectList,
    resetPassword,
    update,
    updateProfileImage
}