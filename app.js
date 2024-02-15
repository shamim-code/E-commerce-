const express =require('express');
const router =require('./src/routes/api');
const app= new express();



const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');



const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");



let URL="mongodb://127.0.0.1:27017/OwnEcommerce";

mongoose.connect(URL).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})


app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.use("/api/v1",router)


app.get('*',function (req,res) {
    res.send("404 Page Not Found !!");
})




module.exports=app;