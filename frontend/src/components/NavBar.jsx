import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  useEffect(() => {
    checkAuth();
  },[location.pathname]);

  async function checkAuth() {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/check-auth",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setLoggedIn(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">To Do App</div>

      <ul className="nav-links">
        {loggedIn ? (
          <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add Task</Link></li>
            <li><Link onClick={logout}>Logout</Link></li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;