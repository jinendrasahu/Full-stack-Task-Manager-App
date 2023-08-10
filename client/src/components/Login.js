import {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({authenticated,setMessage,setLoadingPage}) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if(authenticated){
            return navigate("/");
        }
    });
    function login(){
    setMessage(false,"");
    setLoadingPage(true);
        fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then((data)=>data.json())
        .then((data)=>{
            if(data.success===false){
                setMessage(true, data.message);
            }else{
            setMessage(false,data.message);
            document.cookie=`token=${data.token}`;
            
            window.location.reload()
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
                    <label className='label input-element'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='input input-element' type='email' required></input>
                </div>
                <div className='input-group'>
                    <label className='label input-element'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='input input-element' type='password' required></input>
                </div>
                <div className='input-group'>
                    
                    <div className='input-element'>
                        <button className='btn' onClick={login}>Login</button>
                        </div>
                        <div className='input-element'></div>
                </div>
            </div>
        </div>
    )
}
