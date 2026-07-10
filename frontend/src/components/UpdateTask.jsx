import '../style/addtask.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link,useParams} from 'react-router-dom';


function UpdateTask(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
    getTask();
    },[]);
    async function getTask(){
    const response=await fetch(`http://localhost:4000/api/tasks/${id}`,{
        credentials:"include",
    })
    const data=await response.json();
    setTitle(data.title);
    setDescription(data.description);
    }
    async function handleSubmit(event){
         event.preventDefault();
        try{
        const response=await fetch(`http://localhost:4000/api/tasks/${id}`,{
            method:"PUT",
            credentials: "include",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(
                {
                    title,
                    description
                }
            )
        });
         const data = await response.json();
         console.log(data);
         if(data.success){
         navigate("/");}
         else{
            alert("an unknown error!");
         }

        }catch(err){
        console.log(err);
        }
    }
return(
    <div className="container">
    <h1>Update Task</h1>
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
        <button type="submit" className="submit">Update Task</button>
    </form>
    </div>
)
}
export default UpdateTask;