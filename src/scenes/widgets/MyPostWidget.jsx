import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Window,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { height } from "@mui/system";
import AxiosPrivate from "api/AxiosPrivate";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const axios = AxiosPrivate();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dz2alt1qc",
        uploadPreset: "vuskqirj",
        multiple: false,
        clientAllowedFormats: ["images", "png", "webp", "jpeg"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);
  const handlePost = async () => {
    try {
      const formData = new FormData();
      console.log(_id,post)
      formData.append("userId", _id);
      formData.append("description", post);
      if (imageUrl) {
        formData.append("picturePath", imageUrl);
      }
      console.log(formData,_id,post,imageUrl);
  
      const response = await axios.post(
        `/posts`,
        {userId:_id,description:post,picturePath:imageUrl}
      );
      const posts = response.data
  
      dispatch(setPosts({ posts }));
      setImageUrl("");
      setImage(null);
      setPost(""); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            transition: "all ease-in-out 0.2s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}> */}
        <FlexBetween gap="0.25rem" onClick={() => widgetRef.current.open()}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
{/* 
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clips</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )} */}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
      {imageUrl && (
        <div style={{}}>
          <img
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            src={imageUrl}
            alt=""
          />
        </div>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
