require("dotenv").config();
const express=require("express");
const {connectToMongoDB}=require("./connect");
const app=express();
const PORT = process.env.PORT;
const cors=require("cors");
const taskRoutes=require("./routes/taskRoute");
const userRoute=require("./routes/userRoute");
const cookieParser=require("cookie-parser");
const {verifyJWTToken}=require("./middlewares/auth")

connectToMongoDB(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected!");
});

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());
app.use("/api/tasks",verifyJWTToken,taskRoutes);
app.use("/api/user",userRoute);

app.get("/",(req,res)=>{
    res.json({message:"Hello"});
})

app.listen(PORT,()=>console.log(`Server started running on Port ${PORT}`));