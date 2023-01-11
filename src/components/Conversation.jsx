import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { baseurl } from "constant";


const Conversation = ({data, currentUserId, online}) => {

    const [userData,setUserData] = useState(null)
    const [user, setUser] =useState(null);
    const token = useSelector((state)=>state.token);
    // const userId =  useSelector((state)=>state.user._id)



    const getUser = async (userId) => {
        const response = await axios.get(`${baseurl}/users/${userId}`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        setUser(response.data);
        return response
      }
    useEffect(()=> {
        const userId = data.members.find((id)=>id!==currentUserId)
        console.log(currentUserId,data.members,"kewhruwhur");
        const getUserData = async()=>{
            try {
                const {data}= await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
      userId &&  getUserData();
    },[])
  return (
    <>
       <div className="follower conversation">
        <div>
            {online && <div className="online-dot"></div>}
        <img src={userData?.picturePath} alt=""
        className='followerImage'
        style={{width:'50px',height:'50px'}} />
        <div className="name" style={{fontSize:"0.8rem"}}>
            <span> {userData?.firstName} {userData?.lastName} </span>
            <span>{online? "Online": "Offline"}</span>
        </div>
        </div>
       </div>
       <hr style={{ width: "85%", border: "0.1px solid #ececec" }}/>
       </>
    )
}

export default Conversation