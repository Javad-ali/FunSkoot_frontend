import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Report } from "@mui/icons-material";
import RadioBtn from "./RadioBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;

export default function PostMenu({id,userid,deletePost}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isReport,setIsReport]=React.useState(false)
  const user = useSelector(state=>state.user._id)
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReport = () => {
    setIsReport(true)
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            borderRadius:"8px",
            border:"1px solid #00d5fa"
          },
        }}
      >{!isReport?<>
      {userid === user?
        <MenuItem onClick={handleClose}>
          <IconButton onClick={()=>deletePost()} size={'small'} color='black'>
          <Delete />
          Delete
          </IconButton>
        </MenuItem>:
        <MenuItem onClick={handleReport}>
          <Report  />
          Report
        </MenuItem>
        }
      </>
        :
        <MenuItem>
          <RadioBtn setReport={setIsReport} id={id}/>
        </MenuItem>
      }
      </Menu>
    </div>
  );
}
