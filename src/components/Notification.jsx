import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { userNotifications } from "api/userRequest";

export default function Notification({ data }) {
//   const [notifications, setNotifications] = React.useState([]);
  const notifications = useSelector((state) => state.user.notifications);
//   React.useEffect(() => {
//     const getNotification = async (userId) => {
//       const response = await userNotifications(userId);
//       setNotifications(response.data);
//     };
//     getNotification();
//   }, []);

  return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {notifications?.map((notification) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`${notification.picture}`} />
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notification.time}
                    </Typography>
                    {notification.author}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <Divider variant="inset" component="li" />
      </List>
    )
}
