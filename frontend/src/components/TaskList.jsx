import { useState, useEffect, Fragment } from "react";
import "../style/tasklist.css";
import {Link} from 'react-router-dom';

function TaskList() {
  const [taskData, setTaskData] = useState();
  const [selectedTask,setSelectedTask]=useState([]);  //collection of ids of selected tasks

  useEffect(() => {
    getListData();
  }, []);

  async function getListData() {
    let list = await fetch("http://localhost:4000/api/tasks/",{
      credentials:"include"
    });
    list = await list.json();
    console.log(list);
    setTaskData(list);
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "DELETE",
        credentials:"include",
      });
      console.log(response);
      const data=await response.json();
      if(data.success){
      getListData();
      }else{
        alert("an error occured!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  function selectAll(event){
    console.log(event.target.checked);
    if(event.target.checked){
      let items=taskData.map((item)=>item._id);
      setSelectedTask(items);
    }else{
      setSelectedTask([]);
    }
  }
  function selectSingleTask(id){
    if(selectedTask.includes(id)){
      let items=selectedTask.filter(item=>item!=id);
      setSelectedTask(items);
    }else{
      setSelectedTask([id,...selectedTask]);
    }
  }
  console.log(selectedTask);
async function deleteMany(){

    try{

        const response = await fetch(
            "http://localhost:4000/api/tasks/deleteMany",
           
            {
                method:"DELETE",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ids:selectedTask
                })
            }
        );

        const data = await response.json();

        console.log(data);

        setSelectedTask([]);
        if(data.success){
        getListData();}
        else{
          alert("an unknown error occurred!");
        }

    }catch(err){
        console.log(err);
    }
}
  return (
    <div>
      <h1>To Do List</h1>
      <button className="delete-item delete-multiple" onClick={deleteMany}>Delete</button>
      <ul className="task-list">
        <li className="list-header"><input type="checkbox"
        onChange={selectAll}/></li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item"><input onChange={()=>selectSingleTask(item._id)} checked={selectedTask.includes(item._id)} type="checkbox"/></li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  className="delete-item"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <Link to={"/update/"+item._id} className="update-item">Update</Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}

export default TaskList;
