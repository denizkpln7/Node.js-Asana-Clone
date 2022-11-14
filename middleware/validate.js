const httpStatus = require("http-status")

const validate=(schema)=>(req,res,next)=>{

    const { value,error}=schema.validate(req.body)
    if(error){
        res.status(httpStatus.BAD_REQUEST).json(error)
    }
    Object.assign(req,value)
    return next()


}

module.exports=validate