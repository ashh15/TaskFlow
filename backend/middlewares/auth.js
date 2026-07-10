const jwt=require("jsonwebtoken");

function verifyJWTToken(req,res,next){
const token=req.cookies['token'];
 console.log(req.cookies);
jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
    if(error){
        return res.send({
            msg:"invalid token",
            success:false,
        })
    }
    req.user = decoded;
    next();
})
}

module.exports={
    verifyJWTToken
}