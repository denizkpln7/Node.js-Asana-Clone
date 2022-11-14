const Section=require("../model/Sections")


const insert= async (data)=>{
    console.log(data)
   const section= new Section(data)
   return await section.save()
}

const list= (id)=>{
   return  Section.find().populate({
    path:"user_id",
    select:"full_name email"
   })
   .populate({
    path:"project_id",
    select:"name email"
   })
}

const modify = (data,id)=>{
  return Section.findByIdAndUpdate(id,data,{new:true})
}

const remove = (id)=>{
  return Section.findByIdAndDelete(id)
}



module.exports={
    insert,
    list,
    modify,
    remove
}