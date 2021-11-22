import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addComment } from "../util";
import "./SendMessage.css";

const SendMessage = ({isLoggedIn, token, post_id}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [comment, setComment] = useState("")

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[])

    const createMessage = async (event) => {
        event.preventDefault();
        const result = await addComment(token, post_id, comment)
        alert("Message Sent")
        navigate("/posts")
    }

    return <>
    <h1>Send Message</h1>
    <form onSubmit={createMessage}>
        <input type="text" id="username" placeholder="My Username" minLength="1" value={username} onChange={(event) => setUsername(event.target.value)} required/>   
        <textarea type="text" id="message" placeholder="Enter Message Here" minLength="1" value={comment} onChange={(event) => setComment(event.target.value)} required/>
        <br />
        <button type="submit">Send Message</button>
    </form>
    </>
}

export default SendMessage;