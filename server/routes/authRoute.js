const { getOne, createUser, getUsers, getUserById } = require('../controllers/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/generateToken')
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router()

router.post('/register',async(req,res)=>{
    try {
        const data = await getOne({email:req.body.email})
        if(data){
            return res.status(400).json({message:"data already exist"})
        }
        const pass = bcrypt.hashSync(req.body.password)

        await createUser({...req.body,password:pass})

        return res.status(201).json({message:"Account has been created"})

    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})


//get users


router.get('/',async(req,res)=>{

    try {
    
        const data = await getUsers()
        if(!data){
            return res.status(404).json({message:"data not found"})
        }
        return res.status(200).json({message:"data fetched",data})
    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})


//login user 


router.post('/login',async(req,res)=>{
    try {
        const data = await getOne({email:req.body.email})
        if(!data){
            return res.status(400).json({message:"invalid credentials"})
        }
        const pass = bcrypt.compareSync(req.body.password,data.password)

        if(!pass){
            return res.status(400).json({message:"invalid credentials"}) 
        }
         
        let token = generateToken(data._id)

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        return res.cookie("JWT_TOKEN",token,{
            expires: expirationDate,
            httpOnly: true
        }).status(200).json({message:"login successfull"})

    } catch (error) {
        return res.status(500).json({message:"something went wrongbeen created",data:error})
    }
})

//logout user 



router.get('/logout',async(req,res)=>{

    try {
        res.clearCookie('JWT_TOKEN')
        
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


//current user 


router.get('/me',verifyToken, async(req,res)=>{

    try {
        const user = await getUserById({_id:req.user})
               
        return res.status(200).json({message:"user fetched",user})
    } catch (error) {
        return res.status(500).json({message:"something went wrong",data:error})
    }
})


module.exports = router