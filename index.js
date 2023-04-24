const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const {MongoClient}=require('mongodb')
const url="mongodb+srv://saurav:test@cluster0.rxm9p6q.mongodb.net/test"
const client = new MongoClient(url)
const database="test"


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));
// app.get('/register',(req,res)=>{
//     res.sendFile(__dirname+"/views/index.html")
// })


app.post('/register',(req,res)=>{
const name=req.body.name
const email=req.body.email
const password =req.body.password
const table="demo"
const result=register(table,name,email,password)

if(result!=undefined){
    res.send("Registerd")
}
else{
    res.send("Error try again after some time")
}
})



app.listen(port,()=>{
    console.log("server started at"+port)
})
async function dbConnect(table){
    let result=await client.connect()
    let db=result.db(database)
    return db.collection(table)
    

}

const register=async(table,name,email,password)=>{
    try{

    const db=await dbConnect(table)

    const result=await db.insertOne({
        name:name,
        email:email,
        password:password

    })
    // console.log(result)

    return result
}
catch(e){
    return{
        statusCode:500,
        body:e.message
    }
}
}
