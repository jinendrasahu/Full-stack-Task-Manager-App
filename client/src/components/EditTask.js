import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function EditTask({authenticated,setMessage,setLoadingPage,token}) {
  let [task, setTask] = useState("");
  let [taskid, setTaskid] = useState("");
  let navigate = useNavigate();
  useEffect(()=>{
    let param=new URLSearchParams(window.location.href)
    console.log(param.get("task"),param.get("id"))
    setTask(param.get("task"));
    setTaskid(param.get("id"));
    if(!authenticated){
      return navigate("/login");
    }
  },[])
  
    function update(){
    setMessage(false,"");
    setLoadingPage(true);
        fetch(`http://localhost:4000/task/${taskid}`,{
            method:"PATCH",
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
            setMessage(false,data.message);
          }
            setLoadingPage(false);
            return navigate("/tasks")
        }).catch((err)=>{
            setLoadingPage(false);
            setMessage(true,err.message);
        })
    }
  return (
    <div className='container'>
           <div className='content'>
                
                <div className='input-group'>
                    <label className='label input-element'>Edit Task Name</label>
                    <input value={task} onChange={(e) => setTask(e.target.value)} className='input input-element' type='text'></input>
                </div>
                <div className='input-group'>
                    
                    <div className='input-element'>
                        <button className='btn' onClick={update}>Update Task</button>
                        </div>
                        <div className='input-element'></div>
                </div>
            </div>
        </div>
  )
}
