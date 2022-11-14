const Joi=require("joi")

const createValidation=Joi.object({
    name:Joi.string().required().min(5),
    project_id:Joi.string().required()
})



module.exports={
    createValidation
}