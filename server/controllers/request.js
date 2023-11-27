
const Request = require('../models/request')

const createRequest = (body)=>{
    return Request.create(body)
}

const getRequestById = (id)=>{
    return Request.findById(id)
}


const getRequest = (filter)=>{
    return Request.find(filter)
}


const updateRequest = (id,body)=>{
    return Request.findByIdAndUpdate(id,body,{new:true})
}

const deleteRequest = (id)=>{
    return Request.findByIdAndDelete(id)
}
module.exports = {
    createRequest,
    deleteRequest,
    updateRequest,
    getRequestById,
    getRequest,
    
}









