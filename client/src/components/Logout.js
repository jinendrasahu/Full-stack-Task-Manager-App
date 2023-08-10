import {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout({authenticated,token,setMessage,setLoadingPage}) {
    let navigate = useNavigate();

    useEffect(() => {
        if(!authenticated){
            return navigate("/login");
        }
        logout();
    });
    function logout(){
    setMessage(false,"");
    setLoadingPage(true);
        fetch("http://localhost:4000/logout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:token
            })
        })
        .then((data)=>data.json())
        .then((data)=>{
            if(data.success===false){
                setMessage(true, data.message);
            }else{
            setMessage(false,data.message);
            document.cookie=`token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            setLoadingPage(false);
            window.location.reload()
            }
            
            
        }).catch((err)=>{
            setLoadingPage(false);
            setMessage(true,err.message);
        })
    }
    
    return (
        <div className='container'>
        </div>
    )
}
