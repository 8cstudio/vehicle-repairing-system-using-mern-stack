const Task = require('../models/task')

const Assign_Task = (body) =>{
    return Task.create(body)
}


const get_Tasks = (filter) =>{
    return Task.find(filter)
}


const getTaskById = (id) =>{
    return Task.findById(id)
}

const updateTask = (id,body)=>{
    return Task.findByIdAndUpdate(id,body,{new:true})
}



 module.exports = {
getTaskById,
Assign_Task,
updateTask,
get_Tasks
 }