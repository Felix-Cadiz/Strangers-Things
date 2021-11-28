import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { deletePost } from "../util"
import { useParams } from "react-router";
import "./Posts.css"

const baseURL = "https://strangers-things.herokuapp.com"
const cohortName = '2108-CSE-RM-WEB-PT';
const allPosts = `${baseURL}/api/${cohortName}/posts`

const Posts = ({token, currentUser}) => {
    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const searchTerm = searchParams.get("searchTerm")

    const fetchPosts = async () => {
        try {
            const response = await fetch(allPosts);
            const result = await response.json();
            if (result.error) throw result.error;
            const postResult = result.data.posts
            console.log(postResult)
            setPosts(postResult)
        } catch (error) {
            console.error("Trouble gathering posts!", error)
        }
    }

    useEffect(fetchPosts, [])

    const searchPosts = (post, text) => {
        text = text.toLowerCase();
        const {title, description, location, price} = post;
        for (const field of [title, description, location, price]) {
            if(field.toLowerCase().includes(text)) {
                return true;
            }
        }
    }

    const filteredPosts = searchTerm ? posts.filter(post => searchPosts(post, searchTerm)) : posts;

    const handleDelete = async (post_id) => {
        await deletePost(token, post_id)
        const newPost = posts.filter((post) => post_id !== post._id)
        setPosts(newPost)
    }

    return <>
        <h1>Posts</h1>
        <div className="options">
            <input type="text" name="search" placeholder="Search" value={searchTerm} onChange={(event) => {
                setSearchParams({searchTerm: event.target.value})
            }}/>
            <Link className="createPostButton" to="/NewPost">Create a New Post?</Link>
        </div>
        {   
            filteredPosts && filteredPosts.length
            ? filteredPosts.map((post, idx) => {
                return <div className="Post" key={idx}>
                    <div className="postColumn1">
                        <div className="title">{post.title}</div>
                        <div className="description">{post.description}</div>
                        <>
                            { 
                            currentUser.username === post.author.username && <button onClick={() => handleDelete(post._id)}>Delete</button>
                            }
                        </>
                    </div>
                    <div className="postColumn2">
                        <div className="username"><b>Seller:</b> {post.author.username}</div>
                        <div className="location"><b>Location:</b> {post.location}</div>
                        <div className="price"><b>Price:</b>{post.price}</div>   
                        {
                            currentUser.username !== post.author.username &&
                                <div className="sendMessage">
                                    <Link className="postImage" to={`sendmessage/${post._id}`}><img src="images/sendMessage.png" alt="Send Message"/></Link>
                                    <Link className="postImage" to={`sendmessage/${post._id}`}>Send Message</Link>
                                </div>
                        }
                    </div>
                </div>
            })
            : null
        }
    </>
}

export default Posts;