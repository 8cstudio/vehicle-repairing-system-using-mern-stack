const jwt = require('jsonwebtoken')


const verifyToken = async(req,res,next)=>{
    let token = req.cookies.JWT_TOKEN
    console.log("token",token)
    if(token){
         let d = jwt.verify(token,process.env.SECRET_KEY)
         req.user = d.id 
         if(req.user){
            next()
         }
    }else{
        return res.status(403).json({message:"forbidden! no token found"})
    }
}


module.exports = verifyToken