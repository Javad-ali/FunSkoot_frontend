import {Box, useMediaQuery} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { baseurl } from "constant";

const ProfilePage = () => {
  const [user, setUser] =useState(null);
  const {userId} = useParams();
  const token = useSelector((state)=>state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const {_id} =useSelector((state)=>state.user)
  const isUserProfile = (userId === _id)
  const [action,setAction] =useState(0)

  const getUser = async () => {
    const response = await fetch(`${baseurl}/users/${userId}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    })
    const data = await response.json();
    setUser(data);
  }
     useEffect(()=> {
      getUser();
     },[action]); //eslint-disable-line react-hooks/exhaustive-deps
     if(!user) return null;
  return <Box>
    <Navbar/>
    <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget isProfile={true} userId={userId} picturePath={user.picturePath} setAction={setAction} />
          <Box m="2rem 0"/> 
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {isUserProfile && <MyPostWidget picturePath={user.picturePath} /> }
          <Box m="2rem 0"/>
          <PostsWidget userId={userId} action={action} isProfile />
        </Box>
      </Box>
  </Box>;
}

export default ProfilePage