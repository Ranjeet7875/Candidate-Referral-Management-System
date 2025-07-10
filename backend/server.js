const express=require("express")
const collectioDB=require("./db")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())

const router = require("./routes/referral")
const userRouter=require("./routes/user")

app.get("/check",(req,res)=>{
    res.send("Welcome to Candidate-Referral-Management")
})
app.use("/referral",router)
app.use("/user",userRouter)
app.listen(4000,()=>{
    collectioDB(),
    console.log("Server started")
})