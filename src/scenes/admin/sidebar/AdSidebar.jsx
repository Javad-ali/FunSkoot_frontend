import React from 'react'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';

const AdSidebar = ({setSelect,setHome}) => {
  const Navigate = useNavigate()

  const logout= () =>{
    localStorage.removeItem('adminToken')
    Navigate('/admin')
  }
  return (
       <List sx={{ width: '100%', height:'100vh', maxWidth: 360, border:"1px solid #00d5fa" }}>
         <ListItem>
        <h2 style={{fontFamily:"sans-serif"}}>Admin</h2>
      </ListItem>
     <Divider sx={{backgroundColor:" #00d5fa"}}/>
      <ListItem onClick={()=>setHome(true)} sx={{cursor:'pointer'}}>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Users"  />
      </ListItem>
      <Divider sx={{backgroundColor:" #00d5fa"}}/>
      <ListItem onClick={()=> setHome(false)} sx={{cursor:'pointer'}}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText  primary="Report Posts"/>
      </ListItem>
    </List>
    
  )
}

export default AdSidebar