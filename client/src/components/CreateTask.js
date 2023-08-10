import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateTask({authenticated,setMessage,setLoadingPage,token}) {
  let navigate = useNavigate();
  useEffect(()=>{
    if(!authenticated){
      return navigate("/login");
    }
  })
  let [task, setTask] = useState("");
    function create(){
    setMessage(false,"");
    setLoadingPage(true);
        fetch("http://localhost:4000/task/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                task:task,
                token:token
            })
        })
        .then((data)=>data.json())
        .then((data)=>{
          if(data.success===false){
            setMessage(true,data.message);
            setLoadingPage(false);
          }else{
          setTask("");
            setMessage(false,data.message);
          }
            setLoadingPage(false);
        }).catch((err)=>{
            setLoadingPage(false);
            setMessage(true,err.message);
        })
    }
  return (
    <div className='container'>
           <div className='content'>
                
                <div className='input-group'>
                    <label className='label input-element'>Task Name</label>
                    <input value={task} onChange={(e) => setTask(e.target.value)} className='input input-element' type='text'></input>
                </div>
                <div className='input-group'>
                    
                    <div className='input-element'>
                        <button className='btn' onClick={create}>Add Task</button>
                        </div>
                        <div className='input-element'></div>
                </div>
            </div>
        </div>
  )
}
