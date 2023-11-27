const { getUserById, updateUser, getUsers } = require('../controllers/user')
const adminToken = require('../middleware/adminToken')
const verifyToken = require('../middleware/verifyToken')

const router = require('express').Router()



//get users
router.get('/', async(req,res)=>{
    const filter = {...req.query}
    let excludeFields = ['page','sort','limit','fields']
    excludeFields.forEach(el=>delete filter[el])
    console.log(req.query,filter)
    try {
        const data = await getUsers(filter)
        if(!data){
            return res.status(404).json({message:"data not found"})
        }
        return res.status(200).json({message:"data fetched",data})
    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})

//get user by id


router.get('/:id',async(req,res)=>{
    try {
    
        const data = await getUserById({_id:req.params.id})
        if(!data){
            return res.status(404).json({message:"data not found"})
        }
        return res.status(200).json({message:"data fetched",data})
    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})


//update user  

router.put('/update/:id',async(req,res)=>{
    try {
    
        const data = await updateUser({_id:req.params.id},req.body)
      
        return res.status(200).json({message:"data updated successfully"})
    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})


//delete user

router.put('/delete/:id',async(req,res)=>{
    try {
    
        const data = await deleteUser({_id:req.params.id})
      
        return res.status(200).json({message:"data deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})

module.exports = router
