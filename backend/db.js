const mongoose=require("mongoose")
const DB="mongodb+srv://ranvishwakarma122:nNjOcMP7oTBVqWVK@cluster0.cbs5t.mongodb.net/referralManagement"
const ConnectionDb=async()=>{
    try{
        await mongoose.connect(DB)
        console.log("DB connected successfull")
    }
    catch{
        console.log("DB is not connect ")
    }
    
}
module.exports=ConnectionDb