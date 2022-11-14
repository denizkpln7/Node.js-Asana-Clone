const {insert,list ,modify,remove} =require("../services/Projects")
const httpStatus=require("http-status")

const create=(req,res,next)=>{
   req.body.user_id=req.user
    insert(req.body).then((otherName)=>{
         res.status(httpStatus.CREATED).send(otherName)
    }).catch((err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
    
}

const index=(req,res,next)=>{
    list().then((otherName)=>{
        res.status(httpStatus.OK).send(otherName)
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST)
    })   
  
}

const update=(req,res)=>{
   
     if(!req.params.id) return  res.status(httpStatus.BAD_REQUEST).send({message:"ıd bilgisi eksik"})
     modify(req.body, req.params?.id).then((otherName)=>{
        res.status(httpStatus.CREATED).send(otherName)
   }).catch((err)=>{
       res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
   })


}

const deletePro = (req,res)=>{
    if(!req.params.id) return  res.status(httpStatus.BAD_REQUEST).send({message:"ıd bilgisi eksik"})

    remove(req.params?.id).then((otherName)=>{
        res.status(httpStatus.CREATED).send(otherName)
   }).catch((err)=>{
       res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
   })
}




module.exports={
    create,
    index,
    update,
    deletePro
}