import { userChats } from 'api/ChatRequest';
import ChatBox from 'components/ChatBox/ChatBox';
import { io } from 'socket.io-client';
import Conversation from 'components/Conversation';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";
import Navbar from 'scenes/navbar/Navbar';
import './Chat.css'

const socket=io.connect(process.env.REACT_APP_BASE_URL)


const Chat = () => {

    const user =useSelector((state)=>state.user)
    console.log(user);
    const [chats,setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null); 
    const [onlineUsers, setOnlineUsers] =useState([]) 
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setReciveMessage] = useState(null)


    // sending message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        console.log("Sending message from client",sendMessage);
        socket.emit('send-message',sendMessage)
      }
    },[sendMessage])

    
    
    useEffect(()=>{
        socket.emit("new-user-add",user._id)
        socket.on('get-users',(users)=>{
            setOnlineUsers(users);
        })
    },[user])
    
    // receive message from socket server
    useEffect(()=>{
        socket.on("receive-message",(data)=>{
            console.log("Data received in parent Chat.jsx",data);
            setReciveMessage(data)
        })

    },[])

    useEffect(()=>{
        const getChats = async()=> {
            try {
                const {data} = await userChats(user._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error); 
            }
        }
        getChats()
    },[user])

    const checkOnlineStatus= (chat)=>{
        const chatMember = chat.members.find((member)=>member!== user._id)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online? true : false
    }
  return (
    <>
                <Navbar/>
    <div className="Chat"> 
        {/* Left Side */}
        <div className="Left-side-chat">
            <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
                {chats.map((chat)=>(
                    <div onClick={()=> setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                    </div>
                ))}
            </div>
            </div>
        </div>
        {/* Right Side */}
        <div className="Right-side-chat">
            {/* chat body */}
            <div>
            {/* <div style={{ width: "20rem", alignSelf: "flex-end" }}> */}
            <ChatBox chat={currentChat} currentUser={user._id}setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
            </div>
        </div>
    </div>
                </>
  )
}

export default Chat