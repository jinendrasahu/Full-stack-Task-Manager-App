import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register({authenticated,setLoadingPage, setMessage, setVerification }) {
    let [email, setEmail] = useState("");

    let [otpsent, setOtpsent] = useState(false);
    let [otpresent, setOtpresent] = useState(false);
    let [otp, setOtp] = useState("");
    let [password, setPassword] = useState("");
    let [cpassword, setCpassword] = useState("");
    let timer;
    let navigate = useNavigate();

    useEffect(() => {
        console.log(authenticated)
        if(authenticated){
            return navigate("/");
        }
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    })
    function register() {
        setVerification(false);
        setLoadingPage(true);
        let resend = otpresent ? otpresent : undefined;
        if (resend)
            setMessage(false, "Otp Resent Successfully.");
        else
            setMessage(false, "");
        
        setOtpresent(false);
        
        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmpassword: cpassword,
                resend: resend
            })
        })
            .then((data) => data.json())
            .then((data) => {
                if(data.success===false){
                    setMessage(true, data.message);
                }else{
                setMessage(false, data.message);
                setOtpsent(true);
                timer = setTimeout(() => {
                    setOtpresent(true);
                    setOtp("");
                }, 60000)
                }
                setLoadingPage(false);
                
            }).catch((err) => {
                setLoadingPage(false);
                setMessage(true, err.message);
            })
    }
    function verifyOtp() {
        setMessage(false, "");
        setLoadingPage(true);
        fetch("http://localhost:4000/varify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                code: otp
            })
        })
            .then((data) => data.json())
            .then((data) => {
                if(data.success===false){
                    setMessage(true, data.message);
                    setLoadingPage(false);
                }else{
                setMessage(false, data.message);
                setLoadingPage(false);
                return navigate("/login")
                }
                
                
                
            }).catch((err) => {
                setMessage(true, err.message);
                setLoadingPage(false);
            })
    }
    return (
        <div className='container'>
            {otpsent ? <div className='content'>

                <div className='input-group'>
                    <label className='label input-element'>Enter Otp</label>
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} className='input input-element' type='number' required></input>
                </div>
                <div className='input-group'>
                    
                    <div className='input-element'>
                    <button className='btn' onClick={verifyOtp}>Verify OTP</button>
                        
                    </div>
                    <div className='input-element'>
                    {otpresent ? <button className='btn' onClick={register}>Resend OTP</button> :
                            ""}
                    </div>
                </div>
            </div> : <div className='content'>

                <div className='input-group'>
                    <label className='label input-element'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='input input-element' type='email' required></input>
                </div>
                <div className='input-group'>
                    <label className='label input-element'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='input input-element' type='password' required></input>
                </div>
                <div className='input-group'>
                    <label className='label input-element'>Confirm Password</label>
                    <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} className='input input-element' type='password' required></input>
                </div>
                <div className='input-group'>
                    
                    <div className='input-element'>
                        <button className='btn' onClick={register}>Send OTP</button>
                    </div>
                    <div className='input-element'></div>
                </div>
            </div>}
        </div>
    )
}
