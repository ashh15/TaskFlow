import "../style/addtask.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

function UpdateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getTask();
  }, []);
  async function getTask() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
      {
        credentials: "include",
      },
    );
    const data = await response.json();
    setTitle(data.title);

  console.log("FULL TASK:", data);
  console.log("DUE DATE FROM API:", data.dueDate);
    setDescription(data.description);
    setPriority(data.priority || "Medium");
    setStatus(data.status || "To Do");
    setDueDate(data.dueDate ? data.dueDate.split("T")[0] : "");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            priority,
            status,
            dueDate
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate("/");
      } else {
        alert("an unknown error!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container">
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="Enter task title"
        />
        <label htmlFor="">Description</label>
        <textarea
          rows="4"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder="Enter task description"
          id=""
        />
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Update Task
        </button>
      </form>
    </div>
  );
}
export default UpdateTask;
