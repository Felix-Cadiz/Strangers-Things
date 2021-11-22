import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Account.css"

const Account = ({isLoggedIn, currentUser}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[])

    return <>
        <h1>Account Page</h1>
        <h2> Welcome {currentUser && currentUser.username} </h2>
        <div className="accountIconsContainer">
            <div>
            <Link className="inbox" to="/inbox"><img src="images/inbox.png" 
                alt="Inbox"></img>Inbox</Link>
            </div>
            <div>
            <Link className="newPost" to="/newpost"><img src="images/createNewPost.png" 
                alt="Create a New Post"></img>Create a New Post</Link>
            </div>
            <div>
            <Link className="myPosts" to="/myposts"><img src="images/myPosts.png"
                alt="My Posts"></img>My Posts</Link>
            </div>
        </div>
    </>
}

export default Account;