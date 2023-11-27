const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser())
app.use(morgan('dev'))

const auth = require('./routes/authRoute')
const user = require('./routes/userRoute')
const request = require('./routes/requestRoute')
const task = require('./routes/taskRoute')
const verifyToken = require('./middleware/verifyToken')

app.use('/api/v1/auth',auth)
app.use('/api/v1/user',verifyToken,user)
app.use('/api/v1/request',verifyToken,request)
app.use('/api/v1/task',verifyToken,task)

const port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected")

    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })
    
}).catch((err)=>{
console.log("error",err)
})