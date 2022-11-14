const Project=require("../model/Projects")


const insert= async (projectData)=>{
    const projects= new Project(projectData)
   return await projects.save()
}

const list=async (id)=>{
   return await Project.find({user_id:id} || {}).populate({
    path:"user_id",
    select:"full_name email"
   })
}

const modify = (data,id)=>{
  return Project.findByIdAndUpdate(id,data,{new:true})
}

const remove = (id)=>{
  return Project.findByIdAndDelete(id)
}



module.exports={
    insert,
    list,
    modify,
    remove
}