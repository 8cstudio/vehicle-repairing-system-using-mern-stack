const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    vehicle_image:{
        type:String,
    },
    vehicle_no:{
        type:String
    },
    Vehicle_model:{
        type:String
    },
    desc:{
        type:String,
        required:true
    },

    cost:{
        type:Number
    },
    status:{
        type:String,
        default:"Pending"
    },
    confirm_order:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


module.exports = mongoose.model('Request',requestSchema)