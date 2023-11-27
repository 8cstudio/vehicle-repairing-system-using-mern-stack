const { getRequest, createRequest, getRequestById, deleteRequest } = require('../controllers/request')
const Request = require('../models/request')
const router = require('express').Router()


//get all requests

router.get('/',async(req,res)=>{
    const filter = {...req.query}
    let excludeFields = ['page','sort','limit','fields']
    excludeFields.forEach(el=>delete filter[el])
    console.log(req.query,filter)
    try {
        const data = await getRequest(filter).populate("customer",'username email')

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(200).json({message:"data fetched",data})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//make request 

router.post('/',async(req,res)=>{
    console.log("user",req.user)
    try {
        const data = await createRequest({...req.body,customer:req.user})

        return res.status(201).json({message:"your request has been sent",})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//get by id 


router.get('/:id',async(req,res)=>{
    try {
        const data = await getRequestById({_id:req.params.id}).populate("customer",'username email')

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(200).json({message:"data fetched",data})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

// delete request 

router.delete('/:id',async(req,res)=>{
    try {
        const data = await deleteRequest({_id:req.params.id})

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(200).json({message:"data deleted"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

// update request

router.put('/update/:id',async(req,res)=>{
    try {
        console.log("kkkk")
        const data = await Request.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true
        })

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(201).json({message:"data updated"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//update status


router.put('/update/status/:id',async(req,res)=>{
    try {
        console.log("kkkk")
        const data = await Request.findByIdAndUpdate({_id:req.params.id},{
            status:'Approved'
        })

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(201).json({message:"status updated"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//set Cost

router.put('/update/cost/:id',async(req,res)=>{
    try {
        console.log("kkkk")
        const data = await Request.findByIdAndUpdate({_id:req.params.id},{
           cost:req.body.cost
        })

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(201).json({message:"cost has been set"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

//confirm 


router.put('/update/confirm/:id',async(req,res)=>{
    try {
        console.log("kkkk")
        const data = await Request.findByIdAndUpdate({_id:req.params.id},{
            confirm_order:true
        })

        if(!data){
            return res.status(500).json({message:"data not found"})
        }

        return res.status(201).json({message:"confirmed successfully"})

    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})   



module.exports = router