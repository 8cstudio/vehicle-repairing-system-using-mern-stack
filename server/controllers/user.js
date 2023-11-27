const User = require('../models/user')

const createUser = (body)=>{
    return User.create(body)
}

const getUserById = (id)=>{
    return User.findById(id)
}


const getOne = (email)=>{
    return User.findOne(email)
}

const getUsers = (filter)=>{
    return User.find(filter)
}


const updateUser = (id,body)=>{
    return User.findByIdAndUpdate(id,body,{new:true})
}

const deleteUser = (id)=>{
    return User.findByIdAndDelete(id)
}
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUsers,
    getOne
}
