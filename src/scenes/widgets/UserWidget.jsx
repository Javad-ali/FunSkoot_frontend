import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Check,
  Message,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Input, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Style.css"
import AxiosPrivate from "api/AxiosPrivate";
import { baseurl } from "constant";


const UserWidget = ({ userId ,isProfile,setAction}) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const {_id} =useSelector((state)=>state.user)
  const isUserProfile = (userId === _id)
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
const [editable,setEditable] = useState(false)
const locationRef = useRef("")
const nameRef= useRef("")
const occupationRef=useRef("")
const imageRef = useRef()
const axios = AxiosPrivate()

const editInfo = async()=>{
  console.log(nameRef.current.firstChild.value.split(' ')[0])
 const response = await fetch(`${baseurl}/users/${userId}/editProfile`,{
    method:"PUT",
    headers: { Authorization: `Bearer ${token}` ,
  "Content-Type": "application/json",
  },
    body: JSON.stringify({ firstName:nameRef.current.firstChild.value.split(' ')[0],lastName:nameRef.current.firstChild.value.split(' ')[1  ],occupation:occupationRef.current.firstChild.value,location:locationRef.current.firstChild.value})
  })
  setEditable(false)
  const data = await response.json();
   setUser(data)
   setAction(prev=>prev+1)
}
  const getUser = async () => {
    const response = await fetch(`${baseurl}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
 const profileChange = async(e)=>{

  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "vuskqirj");


  const response = await fetch(`https://api.cloudinary.com/v1_1/dz2alt1qc/image/upload`, {
    method: "POST",
  
    body:formData
  });
  const data = await response.json(); 
  const res = await fetch(`${baseurl}/users/${userId}/editProfileImage`,{
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId ,imageURl:data.secure_url}),
  }); 
  const profileEdited = await res.json();
  setUser(profileEdited)
  setAction(prev=>prev+1)
 }

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    picturePath
  } = user;
const handleChat =async()=>{
  try {
    await axios.post('/chat',{receiverId:userId})
    navigate('/chat')
  } catch (error) {
    if(error.response.status ===304){
      navigate('/chat')
    }
  }
}
  return (
    <WidgetWrapper sx={{
      // position: {lg:"fixed"}
    }}>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
         <button  style={{border:"1px solid",background:"none" , borderRadius:"50%",height:"72px" }} className="scale" onClick={()=> isProfile &&isUserProfile ? imageRef.current.click():""} >  <UserImage image={picturePath} /></button>
          <input ref={imageRef} type="file" hidden  onChange={profileChange}/>
          <Box>
           {editable ? <Input ref={nameRef} defaultValue={firstName+" "+lastName} > </Input> : <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography> }
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
       {isUserProfile && (!isProfile ? <ManageAccountsOutlined /> :   <button style={{border:"none", background:"none" }} onClick={()=> {editable ?   editInfo() : setEditable(!editable)}}>  {editable ?<Check/> : <EditOutlined/>} </button> ) }
        {!isUserProfile&&
        <IconButton onClick={handleChat}>
        <Message/>
        </IconButton>
        }
        </FlexBetween>

        <Divider />

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            {editable ? <Input ref={locationRef} defaultValue={location}></Input>:<Typography color={medium}>{location}</Typography>}
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined  fontSize="large" sx={{ color: main }} />
            {editable ? <Input ref={occupationRef} defaultValue={occupation}></Input> : <Typography color={medium}>{occupation}</Typography> }
          </Box>
        </Box>

        <Divider />

        {/* THIRD ROW */}
        <Box p="1rem">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's Viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />


        {/* FORTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <a href='https://google.com'>
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
              </a>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
