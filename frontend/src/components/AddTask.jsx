import '../style/addtask.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const navigate=useNavigate();
    const handleSubmit = async(e) => {
    e.preventDefault();
   const response=await fetch(
    "http://localhost:4000/api/tasks/add",
    {
    method:"POST",
    credentials:"include",
    headers:{
        "Content-type":"application/json",
    },
    body:JSON.stringify({
        title,
        description,
    })
   });
   const data=await response.json();
   setTitle("");
   setDescription("");
   console.log(data);
   if(data.success){
    navigate("/");
    console.log("new task added");
   }else{
    alert("an error occurred")
   }
  
};
return(
    <div className="container">
    <h1>Add New Task</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input type="text" 
        name="title" 
        value={title}
        onChange={(event)=>{setTitle(event.target.value)}}
        placeholder="Enter task title"/>
        <label htmlFor="">Description</label>
        <textarea rows="4" 
        name="description"
        value={description}
        onChange={(event)=>{setDescription(event.target.value)}}
         placeholder="Enter task description" 
         id=""/>
        <button type="submit" className="submit">Add New Task</button>
    </form>
    </div>
)
}
export default AddTask;