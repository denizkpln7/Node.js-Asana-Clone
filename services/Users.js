const User=require("../model/User")


const insert= async (data)=>{
    const user= new User(data)
   return await user.save()
}

const loginUser= (data)=>{
    return User.findOne({email:data.email})
}

const list=async ()=>{
   return await User.find()
}

const modify=(where,data)=>{
    console.log(data)
   return User.findOneAndUpdate(where,data, {new:true})
}

const updateUser=(where,data)=>{
    
    return User.findOneAndUpdate(where,data, {new:true})
}

module.exports={
    insert,
    list,
    loginUser,
    modify,
    updateUser
}