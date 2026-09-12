import "../style/addtask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/add`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
          dueDate,
        }),
      },
    );
    const data = await response.json();
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("To Do");
    setDueDate("");
    console.log(data);
    if (data.success) {
      navigate("/");
      console.log("new task added");
    } else {
      alert("an error occurred");
    }
  };
  return (
    <div className="container">
      <h1>Add New Task</h1>
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
          Add New Task
        </button>
      </form>
    </div>
  );
}
export default AddTask;
