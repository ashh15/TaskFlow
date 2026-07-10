const express=require("express");
const { handleUserSignUp,handleUserLogin, checkAuth, handleUserLogout} = require("../controllers/User");
const { verifyJWTToken } = require("../middlewares/auth");
const router=express.Router();

router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.get("/check-auth",verifyJWTToken,checkAuth);
router.post("/logout",handleUserLogout);
module.exports=router;