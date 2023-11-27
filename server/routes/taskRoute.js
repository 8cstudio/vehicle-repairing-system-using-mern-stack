const { get_Tasks, Assign_Task, updateTask, getTaskById } = require('../controllers/task')
const Task = require('../models/task')
const router = require('express').Router()

//get tasks
router.get('/',async(req,res)=>{
    try {
        const data = await get_Tasks().populate("request technician")
        if(!data){
            return res.status(404).json({message:"no data found"})
        }
        return res.status(200).json({message:"data fetched",data})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//assign tasks 

router.post('/',async(req,res)=>{
    try {
        const data = await Assign_Task({...req.body,isAssigned:true})
       
        return res.status(200).json({message:"Task Assigned"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//update task

router.put('/update/:id',async(req,res)=>{
    try {
        const data = await updateTask({_id:req.params.id},req.body)
        if(!data){
            return res.status(404).json({message:"no data found"})
        }
        return res.status(200).json({message:"data update"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

//get by id

router.get('/:id',async(req,res)=>{
    try {
        const data = await getTaskById({_id:req.params.id}).populate("request technician")
        if(!data){
            return res.status(404).json({message:"no data found"})
        }
        return res.status(200).json({message:"data fetched",data})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

//mark as complete

router.put('/complete/:id',async(req,res)=>{
    try {
        const data = await Task.findByIdAndUpdate({_id:req.params.id},{
            status:"Completed",
            completion_date:Date.now()
        },{new:true})
        if(!data){
            return res.status(404).json({message:"no data found"})
        }
        return res.status(200).json({message:"data fetched",data})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})



module.exports = router