import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "state";
import { useNavigate } from "react-router-dom";
import AxiosPublic from "api/AxiosPublic";

const Login = () => {
const [data,setData] = useState({email:'',password:''})
const dispatch = useDispatch()
const navigate = useNavigate()
const axios = AxiosPublic()
const handleChange =(e)=>{
setData(prev=>({...prev,[e.target.id]:e.target.value}))
}
const handleLogin = async()=>{
    console.log('adfa')
        try {
            axios.post('/admin/login',data).then(e=>{
                toast.success('login successfull')
                dispatch(setAdminLogin(e.data))
                navigate('/admin/home')
            }).catch(e=>{
                toast.error("invalid credentials")
            })
            
        } catch (error) {
            console.log(error)
        }
    }
  const PaperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#663399" };
  const btnstyle={margin:'8px 0'}
  const inputField={margin:'10px 0'}
  return (
    <Grid>
      <Paper elevation={10} style={PaperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          id="email"
          label="Username"
          style={inputField}
          variant="outlined"
          fullWidth
          value={data.email}
          onChange={handleChange}
          required
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          type={"password"}
          fullWidth
          value={data.password}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox onChange="handleChange" name="gilad" color="primary" />
          }
          label="Remember me"
        />
        <Button type="submit" color="primary" style={btnstyle} variant="contained" fullWidth onClick={handleLogin} component={'button'}>
          Sign In
        </Button>
        <Typography>
          <Link href="#">Forgot password</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link >Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
