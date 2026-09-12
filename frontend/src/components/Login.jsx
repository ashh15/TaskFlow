import '../style/addtask.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(){
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const navigate=useNavigate();

async function handleSubmit(event){
    event.preventDefault();
    const response=await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            email,
            password
        })
    });
    const data=await response.json();
    if(data.success){
        console.log(data);
        navigate("/");
    }else{
        alert("Incorrect email or password");
    }
    console.log(data);
    setEmail("");
    setPassword("");
}
return(
    <div className="container">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input type="text" 
        name="email" 
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
        placeholder="Enter your email"/>
        <label htmlFor="">Password</label>
        <input type="password" 
        name="password" 
        value={password}
        onChange={(event)=>setPassword(event.target.value)}
        placeholder="Enter your password"/>
        <button type="submit" className="submit">Login</button>
        <p className="direct-to">Don't have an account? <Link to="/signup">Sign up</Link> </p>
    </form>
    </div>
)
}
export default Login;