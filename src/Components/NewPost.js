import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addPost } from "../util"
import "./NewPost.css";

const NewPost = ({token, isLoggedIn}) => {
  const blankPost = {title: "", description: "", price: "", location: "", willDeliver: false}
  const [post, setPost] = useState(blankPost)
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) navigate("/login")
},[])

  const createPost = async (event) => {
    event.preventDefault();
    await addPost(token, post)
    setPost(blankPost)
    navigate('/posts')
  }

  return <>
    <h1>Add New Post</h1>
    <form onSubmit={createPost}>

      <input type="text" name="title" value={post.title} placeholder="Item for Sale" minLength="1" required onChange={(event) => {
        setPost({...post, title: event.target.value})
      }}></input>
      <input type="text" name="description" value={post.description} placeholder="Description" minLength="1" required onChange={(event) => {
        setPost({...post, description: event.target.value})
      }}></input>
      <input type="number" name= "price" value={post.price} placeholder="Price" required onChange={(event) => {
        setPost({...post, price: event.target.value})
      }}></input>
      <input type="text" name="location" value={post.location} placeholder="Location" onChange={(event) => {
        setPost({...post, location: event.target.value})
      }}></input>
      <input type="checkbox" id="willDeliver" name="willDeliver" value={post.willDeliver} onChange={(event) => {
        setPost({...post, willDeliver: event.target.checked})
      }}></input>
      <label name="willDeliver">Willing to Deliver?</label>
      <br />
      <button type="submit">Create</button>
    </form>
  </>
}

  export default NewPost;