import "../style/addtask.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
    console.log(data);
    setName("");
    setEmail("");
    setPassword("");
  }
  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit" className="submit">
          Sign up
        </button>
        <p className="direct-to">
          Already signed up? <Link to="/login">Go to login</Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default SignUp;
