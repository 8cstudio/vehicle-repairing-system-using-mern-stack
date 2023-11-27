const jwt = require('jsonwebtoken')

const generateToken = (id)=>{

    return jwt.sign({id:id},process.env.SECRET_KEY,{
        expiresIn:'7d'
    })
}


module.exports = {
    generateToken,

}
