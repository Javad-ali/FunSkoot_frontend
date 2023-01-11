 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { setPosts } from "state";
 import PostWidget from "./PostWidget";
 import { baseurl } from "constant";

 const PostsWidget =({userId, isProfile = false,action}) => {
     const dispatch = useDispatch();
     const posts = useSelector((state)=>state.posts);
     const token = useSelector((state)=>state.token);
    
     const getPosts = async () => {
        try {
            const response = await fetch(`${baseurl}/posts`,{
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            dispatch(setPosts({posts: data}));
            
        } catch (error) {
            console.log(error)
        }
     }

     const getUserPosts = async () => {
        try {
            const response = await fetch(
                 `${baseurl}/posts/${userId}/posts`,
                 {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
            );
            const data = await response.json();
            dispatch(setPosts({posts: data}));
            
        } catch (error) {
            console.log(error)

        }
     };

     useEffect(()=> {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
     },[action]);// eslint-disable-line react-hooks/exhaustive-deps

     return (
        <>
        {posts?.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
                createdAt,
                deleteVisibility
            }) => (!deleteVisibility ?
                <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId._id}
                name={`${userId.firstName} ${userId.lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userId.picturePath}
                likes={likes}
                comments={comments}
                date={createdAt}
                />:null
            )
        )}
        </>
     )

 };     

 export default PostsWidget;