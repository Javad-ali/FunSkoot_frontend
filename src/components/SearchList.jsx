import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function SearchList({ search,setFocus }) {
  const navigate=useNavigate()
  const SearchList = () => {
    console.log(search);
    return search.map((e) => (
      <ListItem alignItems="flex-start" onClick={()=>navigate(`/profile/${e._id}`)} sx={{cursor:'pointer'}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={e.picturePath} />
        </ListItemAvatar>
        <ListItemText
          primary={e.firstName + " " + e.lastName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {e.occupation}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    ));
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {search.length !== 0 ? <SearchList /> : "No Data Found"}

      <Divider variant="inset" component="li" />
    </List>
  );
}
