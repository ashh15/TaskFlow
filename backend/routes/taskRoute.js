const express=require("express");
const router=express.Router();
const {verifyJWTToken}=require("../middlewares/auth.js");
const {handleCreateNewTask,handleGetAllTasks, handleDeleteTask,handleUpdateTask, handleGetTaskById, handleDeleteManyTasks}=require("../controllers/Task");

router.post("/add",handleCreateNewTask);
router.get("/",handleGetAllTasks);
router.delete("/deleteMany",handleDeleteManyTasks);
router.delete("/:id",handleDeleteTask);
router.put("/:id",handleUpdateTask);
router.get("/:id",handleGetTaskById);

module.exports=router;