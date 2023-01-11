import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, ButtonGroup } from "@mui/material";
import { toast } from "react-hot-toast";
import AxiosPrivate from "api/AxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

export default function RadioBtn({setReport,id}) {
    const [value,setValue] = React.useState('')
    const posts = useSelector(state=>state.posts)
    const dispatch = useDispatch()
    const axios = AxiosPrivate()
    const handleChange =(e)=>{
        setValue(e.target.value)
    }
    const handleSubmit = async()=>{
        try {
            if(value==='non') return toast.error('please select a option you fuck')
            await axios.post(`/posts/${id}/report`,{report:value}).then(e=>{
                console.log(e)
                toast.success("woohoo post reported successfully 😇")
                dispatch(setPosts({posts:posts.filter(e=>e._id !==id)}))
            }).catch(e=>{
                console.log(e)
                if(e?.response?.status === 400){
                    toast.error(e.response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Report</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="non" control={<Radio />} label="Select a option" />
        <FormControlLabel value="Harmfull content" control={<Radio />} label="Harmfull content" />
        <FormControlLabel value="Nudity" control={<Radio />} label="Nudity" />
        <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
      </RadioGroup>
      <ButtonGroup>
        <Button
          sx={{
            color: "red",
            border: "1px solid red",
          }}
          onClick={()=>setReport(false)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "success",
            border: "1px solid success",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ButtonGroup>
    </FormControl>
  );
}
