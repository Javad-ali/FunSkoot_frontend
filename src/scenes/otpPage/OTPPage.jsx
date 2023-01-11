import AxiosPublic from "api/AxiosPublic";
import { baseurl } from "constant";

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from 'scenes/navbar/Navbar';
import './OTPPage.css'


const OTPPage = () => {
const axios = AxiosPublic()
    const [otp,setOtp]= useState({a:'',b:'',c:'',d:''});
    const {state} = useLocation()
    const navigate = useNavigate()
    const handleChange = (e)=>{
        console.log(e)
        setOtp(prev=>({...prev,[e.target.id]:e.target.value}))
        document.getElementById(e.target.id).nextSibling.focus()
    }
    console.log(state)
const handleVerify = async ()=>{
    await axios.post('/auth/otp',{email:state.email,otp:otp.a+otp.b+otp.c+otp.d}).then(e=>{
        toast.success("otp verified successfully")
        navigate('/')
    }).catch(e=>{
        toast.error('invalid otp')
        setOtp({a:'',b:'',c:'',d:''})
    })
}
  return (
    <div className='container'> 
    {!state && navigate('/')}
       <div className='from'>
        <label className="otpLabel">
          Enter  OTP:
          <input type="text" maxLength={1} className='otpField'onChange={handleChange} id='a' value={otp.a} />
          <input type="text" maxLength={1}className='otpField' onChange={handleChange} id='b' value={otp.b}/>
          <input type="text" maxLength={1} className='otpField' onChange={handleChange} id='c' value={otp.c}/>
          <input type="text"  maxLength={1} className='otpField'onChange={handleChange} id='d' value={otp.d}/>
        </label>
        <button className='subBtn' type='submit' onClick={handleVerify}>Submit</button>
    </div>
    </div>
  )
}

export default OTPPage