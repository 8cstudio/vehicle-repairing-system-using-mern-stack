const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    technician:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    request:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Request"
    },
    isAssigned:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"Processing"
    },
    completion_date:{
        type:Date
    }
},{
    timestamps:true
})


module.exports = mongoose.model("Task",taskSchema)

