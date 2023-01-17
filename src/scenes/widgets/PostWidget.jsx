import {
  ChatBubbleOutlineOutlined,
  Delete,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Send,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Input,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { setPost } from "state";
import { toast, Toaster } from "react-hot-toast";
import PostMenu from "components/PostMenu";
import { baseurl } from "constant";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  date,
  isProfile
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const commentref = useRef();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${baseurl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const createComment = async () => {
    if (commentref.current.firstChild.value === "") return null;
    const response = await fetch(
      `${baseurl}/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          comment: commentref.current.firstChild.value,
        }),
      }
    );
    commentref.current.firstChild.value = "";
    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  };

  const deleteComment = async (comment) => {
    const response = await fetch(
      `${baseurl}/posts/${postId}/deleteComment`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    toast.error("please wait deleting post");
    const response = await fetch(
      `${baseurl}/posts/${postId}/deletePost`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    // toast.dismiss()
    toast.success("post deleted successfully");
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Toaster />

      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Friend
          name={name}
          subtitle={`${location}   `}
          userPicturePath={userPicturePath}
          date={format(date)}
          userId={postUserId}
          showBtn={!isProfile}
        />
        <FlexBetween>
          <PostMenu id={postId} userid={postUserId} deletePost={deletePost} />
        </FlexBetween>
      </div>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="100%"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            maxHeight: "700px",
            objectFit: 'cover',
            objectPosition: '100% 0'
          }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>

            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(picturePath);
            toast.success("copied to clipboard")
          }}
        >
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box
          mt="0.5rem"
          sx={{ maxHeight: "250px", overflow: "hidden", overflowY: "scroll" }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Input
              ref={commentref}
              name="comment"
              sx={{ display: "block", width: "90%" }}
            />
            <Send onClick={createComment} />
          </Box>
          {comments.map((comment) => (
            <Paper style={{ margin: "20px 10px", padding: "20px 10px" }}>
              <Grid container wrap="nowrap" spacing={1}>
                <Grid item>
                  <Avatar alt="javad" src={`${comment?.userId.picturePath}`} />
                </Grid>
                <Grid justifyContent="lefT" item xs zeroMinWidth>
                  <h4
                    style={{ margin: 0, textAlign: "left" }}
                  >{`${comment?.userId.firstName} ${comment?.userId.lastName}`}</h4>
                  <p style={{ margin: 0, textAlign: "left" }}>
                    {comment?.comment}
                  </p>
                  <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
                    {format(comment?.time)}
                  </p>
                  {loggedInUserId === comment.userId._id && (
                    <Delete onClick={() => deleteComment(comment)} />
                  )}
                </Grid>
              </Grid>
            </Paper>

            // <Box key={`${name}-${i}`}>
            //     <Divider/>
            //     <Typography sx={{color: main, m: "0.5rem 0", pl: "1rem"}}>
            //         {comment?.comment}
            //          {format(comment?.time)}
            //     </Typography>
            //     </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
