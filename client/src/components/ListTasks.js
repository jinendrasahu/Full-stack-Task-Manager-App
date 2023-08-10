import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ListTasks({ authenticated, setMessage, setLoadingPage, token }) {
  let navigate = useNavigate();
  useEffect(() => {

    fetchTasks();
  }, [])
  let [tasks, setTasks] = useState([]);
  function updateTask(id) {
    setMessage(false, "");
    setLoadingPage(true);
    fetch(`http://localhost:4000/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        status:"Completed",
        token:token
      })
    })
      .then((data) => data.json())
      .then((data) => {

        if (data.success === false) {
          setMessage(true, data.message);
          setLoadingPage(false);
        } else {
          fetchTasks();
          setMessage(false, data.message);
        }
        setLoadingPage(false);
      }).catch((err) => {
        setLoadingPage(false);
        setMessage(true, err.message);
      })
  }
  function fetchTasks() {
    if (!authenticated) {
      return navigate("/login");
    }
    setMessage(false, "");
    setLoadingPage(true);
    fetch(`http://localhost:4000/task/get?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((data) => {

        if (data.success === false) {
          setMessage(true, data.message);
          setLoadingPage(false);
        } else {
          setTasks(data.data)
          setMessage(false, data.message);
        }
        setLoadingPage(false);
      }).catch((err) => {
        setLoadingPage(false);
        setMessage(true, err.message);
      })
  }
  function deleteTask(id) {
    setMessage(false, "");
    setLoadingPage(true);
    fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        token:token
      })
    })
      .then((data) => data.json())
      .then((data) => {

        if (data.success === false) {
          setMessage(true, data.message);
          setLoadingPage(false);
        } else {
          fetchTasks();
          setMessage(false, data.message);
        }
        setLoadingPage(false);
      }).catch((err) => {
        setLoadingPage(false);
        setMessage(true, err.message);
      })
  }
  return (
    <div className='container'>
      <div className='content'>
        <table id="task">
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Updated On</th>
            <th>Completed</th>
            <th></th>
          </tr>
          {tasks.length ? tasks.map((task) => {
            return <tr key={task._id}>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{task.created.slice(0,10)}</td>
              <td>{task.updated.slice(0,10)}</td>
              <td>{task.completed_on ? task.completed_on.slice(0,10) : "-"}</td>
              <td><button disabled={task.completed_on} onClick={() => updateTask(task._id)} className={task.completed_on?'btn btn-disabled':'btn btn-success'}>{task.completed_on?"Completed":"Complete"}</button>
              <button onClick={() => deleteTask(task._id)} className={'btn btn-danger'}>Delete</button>
              <button className='btn'><Link className='link' to={"/edit?edit=true&task="+task.task+"&id="+task._id}>Edit</Link></button></td>
            </tr>;
          }) : "No Task Found"}
        </table>

      </div>
    </div>
  )
}
