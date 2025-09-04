// Step 1:Load the packages
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

// Step 2:Create the express app
const app=express();
// Tell the app :"If any request has JSON data,understand"
app.use(express.json())
// Tell the app:"Allow other URL's to interact and share"
app.use(cors());
// step 3:Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/testdb")
// If connection works 
.then(()=>console.log("MongoDB Connected"))
// If connection fails
.catch(err=>console.log("MongoDB Error",err))
// Step 4:Define Models
const Person=mongoose.model("Person",new mongoose.Schema,({name:String,age:Number},"person"));
// Step 5:Define CRUD Routes GET/POST/PUT/DELETE

// READ -(GET request)
// When user goes to Server URL with GET method -> Fetch all people from MongoDB
// Sort name and send back as JSON to browser
app.get("/",async(_req,res)=>{
    try{
        const people=await Person.find().sort({name:1});
        res.json(people);//Send the list of data as JSON to browser
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

app.post("/",async(req,res)=>{
    try{
        const people=await Person.create(
            {
                name:req.body.name,
                age:Number(req.body.age)
            }
        );
        res.status(201).json(people);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});
// Step 6:Start the Server
// Tell Express to start listening on port 4000
app.listen(4000,()=>console.log("Express API Server is running in 4000 port"))

