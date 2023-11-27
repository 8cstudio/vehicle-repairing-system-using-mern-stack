const jwt = require('jsonwebtoken')
const { getUserById } = require('../controllers/user')


const adminToken = async(req,res,next)=>{
    let token = req.cookies.JWT_TOKEN
    if(token){
         let d = jwt.verify(token,process.env.SECRET_KEY)
         let user = d.id 
         console.log("user",user)
        const data = await getUserById(user)
        console.log("d",data)
        if(data.role == 'admin'){
            next()
        }{
            return res.status(403).json({message:"Request forbidden! you are not allowed to access this route"})
        }
    }else{
        return res.status(403).json({message:"forbidden! no token found"})
    }
}


module.exports = adminToken